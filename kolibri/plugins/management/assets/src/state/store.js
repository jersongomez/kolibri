const Vuex = require('kolibri.lib.vuex');
const coreStore = require('kolibri.coreVue.vuex.store');
const constants = require('./constants');

/**
 pageState schemas

 Users page:
 {
   users: [] // list of objects generated by actions._userState
 }

 Data export page:
 {}

 Content import/export page:
 {
   taskList: [] // list of objects
   channelList: [] // list of objects
   wizardState: {} // object
 }

 **/


const initialState = {
  pageName: constants.PageNames.CLASS_MGMT_PAGE,
  pageState: {},
};

const mutations = {
  SET_PAGE_NAME(state, name) {
    state.pageName = name;
  },
  SET_PAGE_STATE(state, pageState) {
    state.pageState = pageState;
  },

  // modal mutations
  SET_MODAL(state, modalName) {
    state.pageState.modalShown = modalName;
  },

  // class mutations
  ADD_CLASS(state, cl) {
    state.pageState.classrooms.push(cl);
  },

  UPDATE_CLASS(state, id, updatedClass) {
    state.pageState.classrooms.forEach((cl, index, arr) => {
      if (cl.id === id) {
        arr[index] = updatedClass;
      }
    });
  },

  DELETE_CLASS(state, id) {
    state.pageState.classrooms = state.pageState.classrooms.filter(cl => cl.id !== id);
  },

  DELETE_CLASSROOM_USER(state, id) {
    state.pageState.classroomUsers = state.pageState.classroomUsers.filter(user => user.id !== id);
  },

  // user mutations
  ADD_USER(state, user) {
    state.pageState.facilityUsers.push(user);
  },

  SET_USER_JUST_CREATED(state, user) {
    state.pageState.userJustCreated = user;
  },

  UPDATE_USERS(state, users) {
    users.forEach(user => {
      state.pageState.facilityUsers.forEach(existingUser => {
        if (existingUser.id === user.id.toString()) {
          existingUser.username = user.username;
          existingUser.full_name = user.full_name;
          existingUser.kind = user.kind;
        }
      });
    });
  },

  DELETE_USER(state, id) {
    state.pageState.facilityUsers = state.pageState.facilityUsers.filter(user => user.id !== id);
  },


  // content import-export-specific mutations
  SET_CONTENT_PAGE_TASKS(state, taskList) {
    state.pageState.taskList = taskList;
  },
  SET_CONTENT_PAGE_CHANNELS(state, channelList) {
    state.pageState.channelList = channelList;
  },
  SET_CONTENT_PAGE_WIZARD_STATE(state, wizardState) {
    state.pageState.wizardState = wizardState;
  },
  SET_CONTENT_PAGE_WIZARD_DRIVES(state, driveList) {
    state.pageState.wizardState.driveList = driveList;
  },
  SET_CONTENT_PAGE_WIZARD_ERROR(state, error) {
    state.pageState.wizardState.error = error;
  },
  SET_CONTENT_PAGE_WIZARD_BUSY(state, isBusy) {
    state.pageState.wizardState.busy = isBusy;
  },
};


// assigns core state and mutations
Object.assign(initialState, coreStore.initialState);
Object.assign(mutations, coreStore.mutations);


module.exports = new Vuex.Store({
  state: initialState,
  mutations,
});
