<template>
  <el-row class="tables-wrapper align-row">
    <el-col :xs="22" :sm="22" :md="18" :lg="14" :xl="14" class="column-wrap">
      <!-----------------------------First table ----------------------------------------->
      <el-col :xs="22" :sm="22" :md="22" :lg="12" :xl="12" class="main-column">
        <div class="list-table" ref="listTable">
          <div class="first-table-title">
            <div class="first-table-title-text">
              <div class="table-text"> To do list</div> <i class="material-icons icon-float add-bg align-row"
                @click="addNewTask">add</i>
            </div>
          </div>
          <div class="table-body">
            <!-----------------------------Draggable component ----------------------------------------->
            <draggable v-model="table1" v-bind="dragOptions" @end="dragEnd">
              <transition-group>
                <!-----------------------------Table item----------------------------------------->
                <div class="align-column" v-for="(arr, index) in table1" :key="index">
                  <div class="toDoImage"><img :src="arr.src" :class="{ myImage: arr.image }" /></div>
                  <div class="list-item">
                    <label class="checkbox-container align-column">
                      <input type="checkbox" class="default-checkbox" />
                      <span class="checkmark" @click="checkItem(arr)"></span>
                    </label>
                    <div class="list-item-text"><input type="text" class="input-list" :value="arr.item"
                        @keyup.enter="updateItem(arr, index)" required /></div>
                    <div class="icon-float-more">
                      <!-----------------------------Table dropdown(Image and Delete) ------------------------------->
                      <el-dropdown trigger="click">
                        <i class="material-icons icon-float-more">more_vert</i>
                        <el-dropdown-menu slot="dropdown" style="margin-top:20px; width: 200px; border-radius:0px">
                          <input type="file" ref="fileInput" style="display:none" @change="uploadFile(arr.id)" />
                          <el-dropdown-item class="dropdown-item align-row" divided>
                            <div class="align-row click-image" @click="$refs.fileInput[index].click()">
                              <i class="material-icons">image</i>
                              <div style="display:inline-block">Image</div>
                            </div>
                          </el-dropdown-item>
                          <el-dropdown-item class="dropdown-item align-row" divided>
                            <div class="align-row click-image" @click="deleteItem(arr)">
                              <i class="material-icons">delete</i>
                              <div style="display:inline-block">Delete</div>
                            </div>
                          </el-dropdown-item>
                        </el-dropdown-menu>
                      </el-dropdown>
                    </div>
                  </div>
                </div>
              </transition-group>
            </draggable>
          </div>
        </div>
      </el-col>
      <!-----------------------------Second table ----------------------------------------->
      <el-col :xs="22" :sm="22" :md="22" :lg="12" :xl="12" class="main-column">
        <div class="list-table">
          <div class="first-table-title">
            <div class="first-table-title-text">
              <div style="float:left !important">Done</div> <i class="material-icons icon-float"
                @click="deleteAllDone">delete_sweep</i>
            </div>
            <div class="first-table-title-add">
            </div>
          </div>
          <div class="table-body">
            <!-----------------------------Draggable component ----------------------------------------->
            <draggable v-model="table2" v-bind="dragOptions" @end="dragEnd">
              <transition-group>
                <!-----------------------------Table item----------------------------------------->
                <div class="align-column" v-for="(arr, index) in table2" :key="index">
                  <div class="toDoImage"><img :src="arr.src" :class="{ myImage: arr.image }" /></div>
                  <div class="list-item">
                    <label class="checkbox-container align-column">
                      <input type="checkbox" class="default-checkbox" />
                      <span class="checkmark-checked" @click="checkItem(arr)"></span>
                    </label>
                    <div class="list-item-text lighten-color">{{arr.item}}</div>
                    <div class="icon-float-more">
                      <!-----------------------------Table dropdown(Image and Delete) ------------------------------->
                      <el-dropdown trigger="click">
                        <i class="material-icons icon-float-more">more_vert</i>
                        <el-dropdown-menu slot="dropdown" style="margin-top:20px; width: 200px; border-radius:0px">
                          <input type="file" ref="fileInput2" style="display:none" @change="uploadFile(arr.id)" />
                          <el-dropdown-item class="dropdown-item align-row" divided>
                            <div class="align-row click-image" @click="$refs.fileInput2[index].click()">
                              <i class="material-icons">image</i>
                              <div style="display:inline-block">Image</div>
                            </div>
                          </el-dropdown-item>
                          <el-dropdown-item class="dropdown-item align-row" divided>
                            <div class="align-row click-image" @click="deleteItem(arr)">
                              <i class="material-icons">delete</i>
                              <div style="display:inline-block">Delete</div>
                            </div>
                          </el-dropdown-item>
                        </el-dropdown-menu>
                      </el-dropdown>
                    </div>
                  </div>
                </div>
              </transition-group>
            </draggable>
          </div>
        </div>
      </el-col>
    </el-col>
  </el-row>
</template>

<script>
  import draggable from 'vuedraggable'
  import axios from 'axios';

  export default {
    name: 'tables',
    components: {
      draggable,
    },
    data() {
      return {
        currentValue: "",
        table1: [],
        table2: [],
        tables: [],
        editable: true,
        num: 0,
        url: "http://localhost:3000"
      }
    },
    computed: {
      dragOptions() {
        return {
          animation: 0,
          group: "description",
          disabled: !this.editable,
          ghostClass: "ghost"
        };
      },
    },
    methods: {
      //Handling response from backend
      handleResponse(data) {
        this.tables = data
        this.table1 = data.filter(function (item) {
          return item.done == false
        })
        this.table2 = data.filter(function (item) {
          return item.done == true
        });
      },
      //Join tables after dragging, ready for backend
      prepareForBackend(t1, t2) {
        var merge = t1.concat(t2);
        merge.forEach((part, index, theArray) => {
          theArray[index].id = index;
        });
        return merge;
      },
      //Sending image source
      sendImage(index, source) {
        let data = {
          id: index,
          src: source
        }
        axios.post(this.url + '/image', data)
          .then((response) => {
            this.handleResponse(response.data);
          })
          .catch((error) => {
            console.log(error);
          });
      },
      //Client side image upload
      uploadFile(id) {
        this.num = id;
        var files = event.target.files;
        var f = files[0];
        var vm = this
        var reader = new FileReader();
        reader.onload = (function (theFile) {
          return function (e) {
            vm.sendImage(vm.num, e.target.result)
          };
        })(f);
        reader.readAsDataURL(f);
      },
      //Drag and drop manipulations
      dragEnd() {
        this.table1.forEach(function (part, index, theArray) {
          theArray[index].done = false;
        });
        this.table2.forEach(function (part, index, theArray) {
          theArray[index].done = true;
        });
        let data = this.prepareForBackend(this.table1, this.table2)
        axios.post(this.url + '/dragAndDrop', data)
          .then((response) => {
            this.handleResponse(response.data);
          })
          .catch((error) => {
            console.log(error);
          });
      },
      //Delete all items
      deleteAllDone() {
        axios.delete(this.url + '/deleteAllDone')
          .then((response) => {
            this.handleResponse(response.data);
          })
          .catch((error) => {
            console.log(error);
          });
      },
      //Add new item
      addNewTask() {
        let data = {
          item: "",
          id: this.tables.length,
          done: false
        }
        axios.post(this.url + '/add', data)
          .then((response) => {
            this.handleResponse(response.data)
          })
          .catch((error) => {
            console.log(error);
          });
      },
      //Delete one item
      deleteItem(arr) {
        axios.delete(this.url + '/deleteItem', {
            data: {
              id: arr.id
            }
          })
          .then((response) => {
            this.handleResponse(response.data);
          })
          .catch((error) => {
            console.log(error);
          });
      },
      //On checkbox click
      checkItem(item) {
        this.tables.forEach((part, index, theArray) => {
          if (index == item.id) {
            let data = {
              id: theArray[index].id
            }
            axios.post(this.url + '/checkmark', data)
              .then((response) => {
                this.handleResponse(response.data)
              })
              .catch((error) => {
                console.log(error);
              });
          }
        });
      },
      //Edit item text
      updateItem(arr, index) {
        if (document.getElementsByClassName("input-list")[index].value.length > 0) {
          let data = {
            item: document.getElementsByClassName("input-list")[index].value,
            id: arr.id,
            done: arr.done
          }
          axios.post(this.url + "/edit", data)
            .then((response) => {
              this.handleResponse(response.data)
            })
            .catch((error) => {
              console.log(error);
            });
        } else {
          alert("Todo item can not be empty")
        }
        document.activeElement.blur();
      },
    },
    //Get data from backend
    mounted() {
      axios.get(this.url)
        .then((response) => {
          this.handleResponse(response.data)
        })
        .catch((error) => {
          console.log(error);
        });
    },
  }

</script>

<style lang="scss"></style>
