<template>
  <div>
    <div class="page-title">{{ $route.meta.title }}</div>
    <div class="know-container">
      <data-tables v-loading="loading" :data="RevisionsData" :table-props="tableProps" align="left"
                   :show-action-bar="false" :custom-filters="customFilters" :pagination-def="paginationDef">
        <el-row slot="custom-tool-bar" style="margin-bottom: 10px" class="class_el_row">
          <el-col :span="24" class="text-align-left">
            <el-input v-model="customFilters[0].vals" prefix-icon="el-icon-search" placeholder="搜索姓名/账号名"
                      class="class_input_width">
            </el-input>
            <el-date-picker :editable="false" v-model="seDate" range-separator="至" start-placeholder="开始日期"
                            end-placeholder="结束日期" type="daterange" placeholder="选择日期范围"
                            @change="setEndDate"></el-date-picker>
            <el-select v-model="customFilters[1].vals" placeholder="所有模块" class="class_select_width">
              <el-option label="所有模块" value=""></el-option>
              <div v-for="module in allmodule">
                <el-option :label="module" :value="module"></el-option>
              </div>
            </el-select>
            <el-select v-model="customFilters[3].vals" placeholder="所有操作" class="class_select_width">
              <el-option label="所有操作" value=""></el-option>
              <div v-for="operation in alloperation">
                <el-option :label="operation" :value="operation"></el-option>
              </div>
            </el-select>
          </el-col>
        </el-row>
        <el-table-column prop="user_name" label="用户名" key="user_name" sortable="custom">
          <template slot-scope="scope">
            <div class="blue"><b>{{scope.row.user_name}}</b></div>
          </template>
        </el-table-column>
        <el-table-column prop="key" label="操作" key="key" sortable="custom">
        </el-table-column>
        <el-table-column prop="revisionable_type" label="所属模块" key="revisionable_type" sortable="custom">
        </el-table-column>
        <el-table-column prop="value" label="内容" key="value" sortable="custom" min-width="300">
          <template slot-scope="scope">
            <div v-html="scope.row.value"></div>
          </template>
        </el-table-column>
        <el-table-column prop="created_at" label="时间" key="created_at" sortable="custom">
        </el-table-column>
      </data-tables>
    </div>
  </div>
</template>

<script>
  import {mapActions, mapState} from 'vuex'

  export default {
    components: {},
    data() {
      return {
        loading: false,
        tableProps: {
          border: false, //去掉边框
          stripe: false //去掉斑马纹
        },
        seDate: null,
        customFilters: [{
          vals: '',
          props: ['user_name', 'value'],
        }, {
          vals: []
        }, {
          vals: []
        }, {
          vals: []
        }, {
          vals: []
        }],
        allstatus: [{
          name: '未绑定',
          value: '0'
        }, {
          name: '已绑定',
          value: '1'
        }],
        //分页设置
        paginationDef: {
          pageSize: 10,
          pageSizes: [10, 20, 50]
        },
        allmodule: [],
        alloperation: []
      }
    },
    computed: {
      ...mapState([
        'RevisionsData'
      ])
    },
    methods: {
      ...mapActions([
        'getRevisions'
      ]),
      async getData() {
        if (this.RevisionsData.length == 0) {
          this.loading = true
        }
        await this.getRevisions()
        for (var i = 0; i < this.RevisionsData.length; i++) {
          if (this.allmodule.indexOf(this.RevisionsData[i].revisionable_type) === -1) {
            this.allmodule.push(this.RevisionsData[i].revisionable_type)
          }
          if (this.alloperation.indexOf(this.RevisionsData[i].key) === -1) {
            this.alloperation.push(this.RevisionsData[i].key)
          }
        }
        this.loading = false
      },
      setEndDate(val) {
        if (val == null) {
          this.customFilters[4].vals = "";
          console.log(this.customFilters[4].vals);
        } else {
          let begin = this.$options.methods.getDates(this.seDate[0]);
          let end = this.$options.methods.getDates(this.seDate[1]);
          this.customFilters[4].vals = this.$options.methods.getAll(begin, end);
          console.log(this.customFilters[4].vals);
        }
      },
      getDates(date) {
        let elDate = new Date(date);
        return elDate.getFullYear() + '-' + (elDate.getMonth() + 1) + '-' + elDate.getDate();
      },
      getAll(begin, end) {
        var ab = begin.split("-");
        var ae = end.split("-");
        var db = new Date();
        db.setUTCFullYear(ab[0], ab[1] - 1, ab[2]);
        var de = new Date();
        de.setUTCFullYear(ae[0], ae[1] - 1, ae[2]);
        var unixDb = db.getTime();
        var unixDe = de.getTime();
        let idsdate = [];
        for (var k = unixDb; k <= unixDe;) {
          idsdate.push((new Date(parseInt(k))).format());
          k = k + 24 * 60 * 60 * 1000;
        }
        return idsdate;
      }
    },
    mounted() {
      this.getData()
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
  .AddGroup {
    color: rgb(60, 152, 255);
    font-size: 14px;
    margin-top: 10px;
    cursor: pointer;

    &-div {
      margin-top: 10px;

      &-input {
        width: 40%;
      }

      &-add {
        color: rgb(60, 152, 255);
        font-size: 14px;
        margin-top: 10px;
        cursor: pointer;
        margin-left: 15px;
      }
    }
  }

  .class_input_width {
    max-width: 250px;
  }

  .operation_box span {
    cursor: pointer;
    color: #8E9EBB;
    margin-right: 10px;
  }
</style>
