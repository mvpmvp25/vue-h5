<template>
	<div>

		<head-top go-back="show" head-title="个人中心"></head-top>

		<div class="app-content">
			<p>{{ userName }}</p>
			<p>{{ userType }}</p>
			<p>{{ appVersion }}</p>

      <scroller style="top: 44px"
      :on-refresh="refresh"
      :on-infinite="infinite">
      <div v-for="(item, index) in items" class="row" :class="{'grey-bg': index % 2 == 0}">
        {{ item }}
      </div>
    </scroller>

		</div>
	</div>
</template>

<script>
import Vue from "vue";
import VueScroller from "vue-scroller";
import headTop from "../../components/header/head";
import { mapState } from "vuex";
import { getUser, testRegister } from "../../service/testGetData";

Vue.use(VueScroller);

export default {
  data() {
    return {
      userName: "",
      userType: "",
      items: []
    };
  },

  created() {
    getUser().then(res => {
      this.userName = res.selUsersInfoListBeans[0].userName;
      this.userType = res.selUsersInfoListBeans[0].userType;
    });
    testRegister("liuge", "123456", "27").then(res => {
      console.log(res)
    });
  },

  mounted() {
    for (var i = 1; i <= 20; i++) {
      this.items.push(i + " - keep walking, be 2 with you.");
    }
    this.top = 1;
    this.bottom = 20;
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

  methods: {
    refresh(done) {//下拉刷新
      console.log("refresh");
      setTimeout(() => {
        var start = this.top - 1;
        for (var i = start; i > start - 10; i--) {
          this.items.splice(0, 0, i + " - keep walking, be 2 with you.");
        }
        this.top = this.top - 10;
        done();
      }, 1500);
    },
    infinite(done) {// 上拉加载
      console.log("infinite");
      setTimeout(() => {
        var start = this.bottom + 1;
        for (var i = start; i < start + 10; i++) {
          this.items.push(i + " - keep walking, be 2 with you.");
        }
        this.bottom = this.bottom + 10;
        done();
      }, 1500);
    }
  }
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

.row {
  width: 100%;
  height: 50px;
  padding: 10px 0;
  font-size: 16px;
  line-height: 30px;
  text-align: center;
  color: #444;
  background-color: #fff;
}
.grey-bg {
  background-color: #eee;
}
.header {
  position: fixed;
  top: 0;
  left: 0;
  height: 44px;
  width: 100%;
  box-shadow: 0 2px 10px 0 rgba(0, 0, 0, 0.1);
  background-color: #fff;
  z-index: 1000;
  color: #666;
}
.header > .title {
  font-size: 16px;
  line-height: 44px;
  text-align: center;
  margin: 0 auto;
}
</style>