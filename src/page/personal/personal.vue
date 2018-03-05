<template>
	<div>

		<head-top go-back="show" head-title="个人中心"></head-top>

		<div class="app-content">
			<p>{{ userName }}</p>
			<p>{{ userType }}</p>
			<p>{{ appVersion }}</p>
		</div>
	</div>
</template>

<script>
import headTop from "../../components/header/head";
import { mapState } from "vuex";
import { getUser } from "../../service/testGetData";

export default {
  data() {
    return {
      userName: "",
      userType: ""
    };
  },

  created() {
    getUser().then(res => {
      this.userName = res.selUsersInfoListBeans[0].userName;
      this.userType = res.selUsersInfoListBeans[0].userType;
    });
  },

  mounted() {
    // getUser().then(res => {
    //   this.userName = res.selUsersInfoListBeans[0].userName;
    //   this.userType = res.selUsersInfoListBeans[0].userType;
    // });
  },

  components: {
    headTop
  },

  computed: {
    ...mapState(["appVersion"])
  },

  methods: {}
};
</script>

<!--<style lang="scss" scoped>-->
<style lang="scss">
@import "../../style/param";
.login-box {
  @extend %box;
}

.login-form {
  margin-top: $px * 10;
  background: $white;
  .login-item {
    width: $mainWidth;
    height: $px * 36;
    margin: 0 auto;
    position: relative;
    &:before {
      content: "";
      width: 10%;
      height: 100%;
      display: block;
      position: absolute;
      left: 0;
      top: 0;
    }
    .login-input {
      border-bottom: 1px #d9d9d9 solid;
      padding-left: 10%;
    }
  }
  .login-mobile-icon {
    &:before {
      background: url($iconMobile) no-repeat center center;
      background-size: auto 50%;
    }
  }
  .login-passkey-icon {
    &:before {
      background: url($iconLock) no-repeat center center;
      background-size: auto 50%;
    }
  }
}

.login-btn {
  @extend %box;
  margin-top: $px * 15;
  .btn {
    @extend %btn;
  }
  .btn.lock {
    background: #c5c5c5;
  }
}

.login-turn {
  width: $mainWidth;
  margin: $px * 20 auto 0;
  span {
    font-size: $px * 12;
    color: $mainColor;
  }
}
</style>