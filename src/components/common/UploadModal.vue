<template>
  <div class="modal" v-if="visible">
    <div class="modal-content">
      <div class="operation">
        <span></span>
        <a href="#" @click="$emit('close');">
          <i class="far fa-times-circle"></i>
        </a>
      </div>
      <h5>Upload Excel</h5>
      <hr class="divider">
      <div>
        <input type="file" accept=".xlsx, .xls, *.csv" @change="handleFileSelect" />
      </div>
      <br>
      <div class="file-upload-button">
        <button @click="handleFileUpload(event)" 
          class="btn btn-primary col start"
          :disabled="!selectedFile"><i class="fas fa-upload"></i>Upload</button>
      </div>
    </div>
  </div>
</template>

<script>
import * as XLSX from 'xlsx';
export default {
  name: 'UploadModal',
  data() {
    return {
      selectedFile: null
    };
  },
  props: {
    visible: {
      type: Boolean,
      required: true
    }
  },
  methods: {
    handleFileSelect(event) {
      this.selectedFile = event.target.files[0];
    },
    handleFileUpload() {
      if (this.selectedFile) {
        this.uploadFile(this.selectedFile);
      }
    },
    async uploadFile(file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const data = new Uint8Array(event.target.result);
        const workbook = XLSX.read(data, { type: 'array' });

        const firstSheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[firstSheetName];
        const jsonData = XLSX.utils.sheet_to_json(worksheet, { header: 1 });

        const headers = jsonData[0].map(header => {
          let lowerCaseHeader = header.toLowerCase();
          if (lowerCaseHeader.includes('gpid')) {
            lowerCaseHeader = "GpId"
          }
          if (lowerCaseHeader.includes('gameid')) {
            lowerCaseHeader = "GameId"
          }
          if (lowerCaseHeader.includes('rank')) {
            lowerCaseHeader = "Rank";
          }
          return lowerCaseHeader;
        });

        const dataArray = [];
        for (let i = 1; i < jsonData.length; i++) {
          const row = jsonData[i];
          const rowObject = {};
          headers.forEach((header, index) => {
            rowObject[header] = row[index];
          });
          dataArray.push(rowObject);
        }
        
        this.$store.dispatch("updateGameRankAPI", {
          data: dataArray
        }).then((res) => {
          if (res.data.errorCode !== 0) {
            swal("Something is wrong !", `${res.data.errorMessage}`, "error", {
              button: "OK",
            });
          } else {
            swal("Success !", "Success update game rank.", "success", {
              button: "OK",
            });
            //reset
            this.$emit("updateGameList");
            this.$emit('close');
          }
        });;
      };
      reader.readAsArrayBuffer(file);
    }
  }
}
</script>

<style scoped>
.modal {
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  z-index: 1;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  overflow: auto;
  background-color: rgba(0, 0, 0, 0.4);
}

.modal-content {
  background-color: #fefefe;
  margin: 15% auto;
  padding: 20px;
  border: 1px solid #888;
  width: 40%;
}

.close {
  color: #aaa;
  float: right;
  font-size: 28px;
  font-weight: bold;
}

.close:hover,
.close:focus {
  color: black;
  text-decoration: none;
  cursor: pointer;
}
.divider {
  width: 100%;
  border: 1px solid black;
}
.file-upload-button {
  display: inline-block;
  position: relative;
}
.operation {
  display: flex;
  justify-content: space-between;
}
</style>
