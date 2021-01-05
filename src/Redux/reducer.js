
const initialstate = {
    studentDatail: {
        firstName: '',
        lastName: '',
        mobileNo: '',
        fatherName: '',
        email: '',
        address: 'Home',
        gender: 'male',
        DOB: new Date(),
        file: [null],
    },
    students: [],
};

const reducer = (state = initialstate, action) => {
    switch (action.type) {
        case 'GET_STUDENTS':
            return {
                ...state
            };
        case 'ADD_STUDENT':
            return {
                ...state,
                studentDatail: action.payload,
                students: state.students.concat(action.payload)
            }
        case 'UPDATE_STUDENT':
            return {
                ...state,
                studentDatail: action.payload,
                students: state.students.map(
                    (content, i) => content.id === action.payload.id ? { ...content, ...action.payload }
                        : content)
            }
        case 'DELETE_STUDENT':
            return {
                ...state,
                students: state.students.filter(item => item.id !== action.payload.id)
            };
        default:
            return state;
    }
};

export default reducer;   