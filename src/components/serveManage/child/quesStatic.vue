<template>
  <section class="ques-wrapper">
    <section class="ques-content">
      <p class="content__title">{{questionnaireTitle}}</p>
      <p class="content__tips">参与问卷【{{data && data.length}}】</p>
      <section class="content__list">
        <section v-for="(item, index) in data" :key="index" class="content__item">
          <p class="content__item__title">{{item.title}} <span>(参与人数{{item.count}})</span></p>
          <ul class="item__list">
            <li v-for="(list, lid) in item.options" :key="lid" class="item__content">
              <strong class="item__title">{{list.optionContent}}</strong>
              <el-progress :percentage="list.rate" class="my-progress"></el-progress>
              <strong class="item__total">({{list.count}})</strong>
            </li>
          </ul>
        </section>
      </section>
      <section class="btn-area">
        <el-button type="danger" @click="handleCancel">返回</el-button>
      </section>
    </section>
  </section>
</template>

<script>
import {mapActions} from 'vuex'
export default {
  name: '',

  data () {
    return {
      data: [],
      questionnaireTitle: '',
    }
  },

  methods: {
    ...mapActions({
      'getInfo': 'getServerStore'
    }),
    handleCancel(){
      this.$router.go(-2)
    }
  },
  created(){
    let data = this.$route.query.data
    data && (data = JSON.parse(data))
    if(data){
      this.getInfo({path:'问卷统计', search: {id: data.id}}).then(res => {
        this.data = res.data.question.map(item => {
          item.options = res.data.options.filter(ss => {
            if(item.id === ss.id) {
              ss.rate = ss.count == 0 ? 0 : ((Number.parseInt(ss.count) / item.count) * 100).toFixed(2)
              return ss
            }})
          return item
        })
        this.questionnaireTitle = res.data.questionnaireTitle
        console.log(this.data)
      })
    }
  }
}
</script>

<style scoped lang='scss' >
@import '@/assets/style/color.scss';
@import '@/assets/style/mixin.scss';
  section.ques-content{
    width:100%;
    height: 100%;
    padding: 20px 15px;
    background-color: #fff;
    p.content__tips{
      margin-bottom: 15px;
      font-size: 14px;
      color: $text-gray;
    }
    .content__list{
      .content__item__title{
        margin-bottom: 10px;
        color: #666;
        font-size: 15px;
        span{
          color: $text-success;
        }
      }
      .item__list{
        width: 100%;
        .item__content{
          @include flex-box(row, nowrap, flex-start, center);
          height: 40px;
          line-height: 40px;
          .my-progress{
            width: 50%;
            margin:0 20px;
            margin-right: 0;
          }
          .item__title,
          .item__total{
            font-weight: normal;
          }
          .item__total{
            color: $text-success;
          }
        }
      }
    }
    .btn-area{
      margin:20px 0;
      margin-right: 10%;
      text-align: center;
      .el-button{
        width: 120px;
      }
    }
  }
</style>
