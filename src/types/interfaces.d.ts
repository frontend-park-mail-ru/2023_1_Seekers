interface baseStoreObject {
    callbacks: emptyCallback,
    promise: Promise<string> | null,
}

interface dispatcherPayload {
    type: string,
    data: any
}

interface anyObject {
    [key: string]: any
}

interface componentContext extends anyObject {
    parent: HTMLElement,
}


interface DispatcherCallbackObject {
    callback: emptyCallback | oneParamCallback,
    isPending: boolean,
}

interface user extends anyObject {
    avatar?: string,
    login: string,
    password: string,
    repeatPw?: string,
    firstName?: string,
    lastName?: string,
}

interface userPwForm extends anyObject {
    passwordOld: string,
    password: string,
    repeatPw: string,
}
