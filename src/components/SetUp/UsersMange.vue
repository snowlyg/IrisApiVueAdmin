<template>
  <div>
    <div class="head">
      <h1 class="head-title">{{$route.meta.title}}</h1>
      <div class="head-action">
        <el-input
          v-model="customFilters[0].vals"
          prefix-icon="el-icon-search"
          placeholder="搜索账号名"
          class="class_input_width">
        </el-input>
        <el-button type="primary" @click="goSeed">新建账号</el-button>
      </div>
    </div>

    <div class="content">
      <data-tables-server :data="AdminsData.ListData" :filters="customFilters" :total="AdminsData.total"
                          @query-change="getData"
                          ref="multipleTable" v-loading="loading" :pagination-props="{ pageSizes: [5, 10, 20] }"
                          :page-size="10">
        <el-row slot="custom-tool-bar" style="margin-bottom: 10px" class="class_el_row">
          <el-col :span="24" class="text-align-left">

          </el-col>
        </el-row>
        <el-table-column prop="Username" label="姓名" key="Username" sortable="custom">
          <template slot-scope="scope">
            <div class="blue cursor" @click="details(scope)"><b>{{scope.row.Username}}</b></div>
          </template>
        </el-table-column>
        <el-table-column prop="Name" label="账号名" key="Name" sortable="custom">
        </el-table-column>

        <el-table-column prop="Role" label="角色" key="Role" sortable="custom">
          <template slot-scope="scope">
            <div>
              {{scope.row.RoleName}}
            </div>
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <div class="operation_box">
              <span @click="edit(scope.row)">编辑</span>
              <span @click="deletes(scope.row)">删除</span>
            </div>
          </template>
        </el-table-column>
      </data-tables-server>
    </div>
    <el-dialog title="角色详情" :visible.sync="previewcol" class="previewcol">
      <div class="cl-box" style="width:100%;">
        <div class="cl-row">
          <div class="cl-td">
            <p>姓名</p>
          </div>
          <div class="cl-td">
            <p>{{colshowlog.Username}}</p>
          </div>
        </div>
        <div class="cl-row">
          <div class="cl-td">
            <p>账号名</p>
          </div>
          <div class="cl-td">
            <p>{{colshowlog.Name}}</p>
          </div>
        </div>
        <div class="cl-row">
          <div class="cl-td">
            <p>角色</p>
          </div>
          <div class="cl-td">
            <p>{{colshowlog.RoleName}}</p>
          </div>
        </div>
        <div class="cl-row">
          <div class="cl-td">
            <p>创建时间</p>
          </div>
          <div class="cl-td">
            <p>{{colshowlog.CreatedAt}}</p>
          </div>
        </div>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button @click="previewcol = false">取 消</el-button>
        <el-button type="primary" @click="edit(colshowlog)">编 辑</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
    import {mapActions, mapState} from 'vuex'
    import utils from '@/utils'

    export default {
        components: {},
        data() {
            return {
                loading: false,
                tableProps: {
                    border: false, //去掉边框
                    stripe: false //去掉斑马纹
                },
                customFilters: [{
                    vals: '',
                    props: ['Username', 'Name'],
                }, {
                    vals: []
                }, {
                    vals: []
                }, {
                    vals: []
                }],
                //分页设置
                paginationDef: {
                    pageSize: 10,
                    pageSizes: [10, 20, 50]
                },
                dialogVisible: false,
                save_id: null,
                previewcol: false,
                //存放弹出框的数据
                colshowlog: {},
            }
        },
        computed: {
            ...mapState([
                'AdminsData'
            ])
        },
        methods: {
            ...mapActions([
                'getAdmins'
            ]),
            deletes(row) {
                this.$confirm('真的要删除此账号吗？', '删除', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(async () => {
                    this.loading = true;
                    const data = await utils.deleteAdmins(row.Id);
                    if (data.data.status) {
                        this.$message({
                            message: data.data.msg,
                            type: 'success'
                        });
                    } else {
                        this.$message.error(data.data.msg)
                    }
                    this.getData();
                    this.loading = false
                }).catch(() => {

                })
            },
            details(scope) {
                this.colshowlog = scope.row;
                this.previewcol = true;
            },
            async getData(queryInfo) {
                if (this.AdminsData.length === 0) {
                    this.loading = true
                }

                let limit = 1;
                let offset = 10;
                if (queryInfo) {
                     limit = queryInfo.pageSize;
                     offset = queryInfo.page;
                }

                this.AdminsData.queryData = {
                    limit: limit,
                    offset: offset,
                    name: this.customFilters[0].vals,
                };
                await this.getAdmins(this.AdminsData.queryData);

                this.loading = false
            },
            goSeed() {
                this.$router.push({
                    name: 'AddUsers'
                })
            },
            edit(row) {
                this.$router.push({
                    name: 'EditUsers',
                    params: {
                        id: row.Id
                    }
                })
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
    width: 350px;
  }

  .operation_box span {
    cursor: pointer;
    color: #8E9EBB;
    margin-right: 10px;
  }

  .head {
    height: 70px;
    background-color: #fff;
    line-height: 70px;
    padding: 0 30px;
    margin-top: 10px;
    display: flex;

    &h1 {
      font-size: 20px;
      color: rgb(16, 16, 16);
      font-weight: 400;
      width: 180px;
    }

    &-action {
      flex: 1;
      text-align: right;

      &-search {
        width: 240px;
        margin-right: 10px;
      }

    }
  }

  .content {
    background-color: #fff;
    overflow: hidden;
    margin: 10px;
    padding: 15px;
    border-radius: 4px;

    &-select {
      padding: 10px 15px;
      background-color: rgb(246, 247, 248);
      position: relative;

      .line {
        position: absolute;
        width: 1px;
        height: 24px;
        background: rgb(187, 187, 187);
        left: 110px;
        top: 18px;
      }

      &-button {
        display: inline-block;
        margin-left: 60px;
      }

    }
  }
</style>
