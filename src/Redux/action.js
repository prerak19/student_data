export function getStudents() {
    return dispatch => {
        return dispatch({
            type: 'GET_STUDENTS'
        });
    }
};

export function addStudent(data) {
    return dispatch => {
        return dispatch({
            type: 'ADD_STUDENT',
            payload: data,
            rc: 0,
        });
    }
};

export function editStudent(data) {
    return dispatch => {
        return dispatch({
            type: 'UPDATE_STUDENT',
            payload: data,
            rc: 0,
        });
    }
};

export function deleteStudent(studentId) {
    return dispatch => {
        return dispatch({
            type: 'DELETE_STUDENT',
            payload: studentId,
            rc: 0,
        });
    }
};