<template>
  <div class="form-group">
    <div class="radio">
      <label>
        Game Icon :
        <input type="radio" v-model="gameLanguage.isGameIconOnServer" @change="gameIconTypeOnChange($event)"
          :id="'file-' + index" :value="fileValue" />
        File
      </label>
      <label>&emsp;</label>
      <label>
        <input type="radio" v-model="gameLanguage.isGameIconOnServer" @change="gameIconTypeOnChange($event)"
        :id="'url-' + index" :value="urlValue" />
        Url
      </label>
    </div>
    <div class="game-icon-file" v-show="gameLanguage.isGameIconOnServer ?? true">
      <input type="file" id="exampleInputFile" @change="uploadIcon($event)" />
      <img :src="gameLanguage.gameIconFilePath" v-if="gameLanguage.gameIconFilePath !== ''" />
    </div>
    <div class="game-icon-url" v-show="gameLanguage.isGameIconOnServer == false">
      <input type="text" id="exampleInputUrl" class="form-control" v-model="gameLanguage.gameIconFilePath" />
    </div>
  </div>
</template>

<script>
export default {
  name: "UploadComponent",
  props: {
    gameLanguage: Object,
    permission: Object,
    index: Number,
    fileValue: Boolean,
    urlValue: Boolean,
    gameId: Number,
    gameProviderId: Number
  },
  methods: {
    async uploadIcon(e) {
      console.log(this)
      let $this = this;
      let file = e.target.files[0];
      //寫入檔案名
      this.$emit('updateIconName', file.name, this.index);
      //渲染預覽圖片
      let reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = (e) => {
        this.gameLanguage.gameIconFilePath = e.target.result;
      };
      let loader = $this.$loading.show();
      try {
        if (this.gameProviderId < 1000) {
          await this.$store
            .dispatch("uploadGameIconAPI", file)
            .then(function () {
              console.log("Upload Game Icon success.");
            })
            .catch(function () {
              console.log("Upload Game Icon fail.");
              swal(
                "Upload Game Icon fail!",
                "Please try Upload again.",
                "error",
                { button: "OK" }
              );
            });
        }
        else {
          let data = {
              GameId: parseInt(this.gameId),
              ProviderId: parseInt(this.gameProviderId),
              iconFile: file
          };
          await this.$store
            .dispatch("uploadKhGameIconAPI", data)
            .then(function () {
              console.log("Upload Game Icon success.");
            })
            .catch(function () {
              console.log("Upload Game Icon fail.");
              swal(
                "Upload Game Icon fail!",
                "Please try Upload again.",
                "error",
                { button: "OK" }
              );
            });
        }
      } finally {
          loader.hide();
      }
    },
    gameIconTypeOnChange(event){
      let fileDiv = $(event.target).parents('.form-group').find('.game-icon-file');
      let urlDiv = $(event.target).parents('.form-group').find('.game-icon-url');
      if(event.target.id.includes("url")){
        fileDiv.slideUp();
        urlDiv.slideDown();
      }
      else{
        fileDiv.slideDown();
        urlDiv.slideUp();
      }
    },
  }
};
</script>

<style lang="scss" scoped>

</style>
