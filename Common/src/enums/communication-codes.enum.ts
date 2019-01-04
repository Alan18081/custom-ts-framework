export enum CommunicationCodes {
    GET_USERS_LIST = '[UsersService] Get Users List',
    GET_USER = '[UsersService] Get User',
    GET_USER_BY_ID = '[UsersService] Get User By ID',
    GET_USER_BY_EMAIL = '[UsersService] Get User By Email',
    CREATE_USER = '[UsersService] Create User',
    UPDATE_USER = '[UsersService] Update User',
    REMOVE_USER = '[UsersService] Remove User',

    LOGIN = '[AuthService] Login User',
    LOGIN_PROJECT = '[AuthService] Login Project',
    AUTH_BY_TOKEN = '[AuthService] Auth By Token',

    GET_PROJECTS_LIST = '[ProjectsService] Get Projects List',
    GET_PROJECTS_LIST_BY_USER = '[ProjectsService] Get Projects By User',
    GET_PROJECT = '[ProjectsService] Get Project',
    GET_PROJECT_BY_CLIENT_INFO = '[ProjectsService] Get Project By Client Info',
    CREATE_PROJECT = '[ProjectsService] Create Project',
    UPDATE_PROJECT = '[ProjectsService] Update Project',
    REMOVE_PROJECT = '[ProjectsService] Remove Project',

    GET_STORAGES_LIST = '[ProjectsService] Get Storages List',
    GET_STORAGE = '[ProjectsService] Get Storage',
    CREATE_STORAGE = '[ProjectsService] Create Storage',
    UPDATE_STORAGE = '[ProjectsService] Update Storage',
    UPDATE_STORAGE_DATA = '[DataService] Update Storage Data',
    REMOVE_STORAGE = '[ProjectsService] Remove Storage',

    GET_STORAGE_DATA = '[DataService] Get Storage Data',
    GET_STORAGE_DATA_BY_STORAGE = '[DataService] Get Storage Data By Storage',
    CREATE_STORAGE_DATA = '[DataService] Create Storage Data',
    CHANGE_STORAGE_DATA = '[DataService] Change Storage Data',
    REMOVE_STORAGE_DATA = '[DataService] Remove Storage Data',

    GET_STORAGE_RECORDS_LIST = '[DataService] Get Storage Records List',
    GET_STORAGE_RECORD = '[DataService] Get Storage Record',
    CREATE_STORAGE_RECORD = '[DataService] Set Storage Record',
    REMOVE_STORAGE_RECORD = '[DataService] Remove Storage Record',
}