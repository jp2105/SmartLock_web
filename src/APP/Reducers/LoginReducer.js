import { SIGNUP, LOGINCHECK } from '../Common/Constants'

let usedata = {
	user: {}
}

export const LoginReducer = (state = usedata, action) => {
	switch (action.type) {
		case SIGNUP:
			return { user: action.payload }
		case LOGINCHECK:
			return { user: action.payload }
		default:
				return state
	}

}
