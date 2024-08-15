<template>
    <div class="form-group">
        <div class="radio">
            {{text}}:
          <label>
            <input
              type="radio"
              :value="true"
              @input="$emit('update:modelValue', $event.target.value)"
            />
            {{radio1Text}}
          </label>
        </div>
        <div class="radio">
          <label>
            <input
              type="radio"
              :value="false"
              @input="$emit('update:modelValue', $event.target.value)"
            />
            {{radio2Text}}
          </label>
        </div>
      </div>
</template>

<script>
export default{
 name: "Radio",
 props: ["text", "modelValue", "radio1Text", "radio2Text"],
};
</script>


<style lang="scss" scoped>
@import "../../assets/scss/rwd.scss";

.form-group {
    display: flex;
    align-items: center;
    margin-bottom: 20px;
    @include rwd768 {
      font-size: 14px;
    }

    label {
      margin: 0 5px;
    }
  }
</style>