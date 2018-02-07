<template>
  <span class="el-status el-yy-status el-status-not-a-wrapper">
    <span :class="className" class="el-yy-status-dot"></span>
    <span class="el-yy-status-text">{{text}}</span>
  </span>
</template>

<script>
export default {
  name: 'status',
  props: {
    status: {
      type: String,
      required: true
    },
    text: {
      type: String,
      required: false
    }
  },
  computed: {
    className() {
      return `el-yy-status-${this.status}`
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  @-webkit-keyframes antStatusProcessing {
    0% {
      -webkit-transform: scale(0.8);
      transform: scale(0.8);
      opacity: 0.5;
    }
    100% {
      -webkit-transform: scale(2.4);
      transform: scale(2.4);
      opacity: 0;
    }
  }
  @keyframes antStatusProcessing {
    0% {
      -webkit-transform: scale(0.8);
      transform: scale(0.8);
      opacity: 0.5;
    }
    100% {
      -webkit-transform: scale(2.4);
      transform: scale(2.4);
      opacity: 0;
    }
  }
  .el-status {
    /*font-size: 14px;*/
    color: rgba(0, 0, 0, 0.65);
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    margin: 0;
    padding: 0;
    list-style: none;
    position: relative;
    display: inline-block;
    line-height: 1;
    vertical-align: middle;
  }
  .el-yy-status {
    line-height: inherit;
    vertical-align: baseline;
  }
  .el-yy-status-default {
    background-color: #d9d9d9;
  }

  .el-yy-status-dot {
    width: 6px;
    height: 6px;
    display: inline-block;
    border-radius: 50%;
    vertical-align: middle;
    position: relative;
    top: -1px;
  }
  .el-yy-status-text {
    color: rgba(0, 0, 0, 0.65);
    font-size: 13px;
    margin-left: 8px;
  }
  .el-yy-status-processing {
    background-color: #1890ff;
    position: relative;
  }
  .el-yy-status-processing:after {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    border-radius: 50%;
    border: 1px solid #1890ff;
    content: '';
    -webkit-animation: antStatusProcessing 1.2s infinite ease-in-out;
    animation: antStatusProcessing 1.2s infinite ease-in-out;
  }
  .el-yy-status-success {
    background-color: #52c41a;
    position: relative;
  }
  .el-yy-status-success:after {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    border-radius: 50%;
    border: 1px solid #52c41a;
    content: '';
    -webkit-animation: antStatusProcessing 1.2s infinite ease-in-out;
    animation: antStatusProcessing 1.2s infinite ease-in-out;
  }
  .el-yy-status-warning {
    background-color: #faad14;
    position: relative;
  }
  .el-yy-status-warning:after {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    border-radius: 50%;
    border: 1px solid #faad14;
    content: '';
    -webkit-animation: antStatusProcessing 1.2s infinite ease-in-out;
    animation: antStatusProcessing 1.2s infinite ease-in-out;
  }
  .el-yy-status-error {
    background-color: #f5222d;
    position: relative;
  }
  .el-yy-status-error:after {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    border-radius: 50%;
    border: 1px solid #f5222d;
    content: '';
    -webkit-animation: antStatusProcessing 1.2s infinite ease-in-out;
    animation: antStatusProcessing 1.2s infinite ease-in-out;
  }
  .el-yy-not-a-wrapper {
    top: auto;
    display: block;
    position: relative;
    -webkit-transform: none !important;
    -ms-transform: none !important;
    transform: none !important;
  }
</style>
