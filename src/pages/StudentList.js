import React, { Component } from 'react';
import { getStudents, addStudent, editStudent, deleteStudent } from '../Redux/action';
import { Row, Col, Modal, ModalHeader, ModalBody, ModalFooter, FormGroup, Label, Input as InputStrap, Button } from 'reactstrap';
import { connect } from 'react-redux';
import Input from '../common/components/input';
import Table from '../common/components/Table';

const dateComponent = (data, size = "") => {
  let monthValue = new Date(data.value).getMonth() + 1;
  let dateValue = new Date(data.value).getDate();
  const yearValue = new Date(data.value).getFullYear();
  dateValue = dateValue.toString().length > 1 ? dateValue : `0${dateValue}`;
  monthValue = monthValue.toString().length > 1 ? monthValue : `0${monthValue}`;
  return `${dateValue}/${monthValue}/${yearValue}`;
};

class StudentList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      crudData: false,
      form: {
        email: "",
        firstName: "",
        lastName: "",
        mobileNo: '',
        address: '',
        country: 'India',
        fatherName: '',
        DOB: new Date(),
        gender: 'male',
        errors: {
          email: null,
        }
      },
      file: null,
    }
    this.ctColumns = [
      { accessor: 'action', Header: 'Action', Cell: this.actionFormatter },
      { accessor: 'profileImage', Header: 'Images', Cell: this.profileComponent },
      { accessor: 'firstName', Header: 'First Name' },
      { accessor: 'fatherName', Header: 'Father Name' },
      { accessor: 'lastName', Header: 'Last Name' },
      { accessor: 'email', Header: 'Email' },
      { accessor: 'DOB', Header: 'Date Of Birth', Cell: this.dateFormatter },
      { accessor: 'address', Header: 'Address' },
      { accessor: 'mobileNo', Header: 'Mobile No.' },
      { accessor: 'gender', Header: 'Gender' },
      { accessor: 'country', Header: 'Country' },
    ];
    this.fileObj = [];
    this.fileArray = [];
    this.onInputChange = this.onInputChange.bind(this);
  }

  //#region engagement column formatters
  actionFormatter = ({ row, value }) => {
    return < div className="text-center" >
      <i style={{ cursor: 'pointer' }} className="fa fa-lg fa-pencil-square-o"
        onClick={() => this.editStudentDetails(row)}></i>
      <i style={{ cursor: 'pointer' }} className="fa fa-lg fa-trash ml-2"
        onClick={() => this.handleDeletePopup(row)}></i>
    </div >
  }

  handleDeletePopup(row) {
    if (window.confirm('Are You sure you want to delete?')) {
      this.props.deleteStudent({ id: row.original.id });
    }
  }

  dateFormatter = ({ value, row }) => (
    <div>
      {dateComponent({ value: row.original.DOB, row })}
    </div>
  );

  profileComponent = ({ value, row }) => (
    <div>
      {row.original.file && row.original.file.map((x, i) =>
        <img className="profileImage" key={i} height="auto" width="40px" src={x} alt="" />
      )}
    </div>
  );

  editStudentDetails = (row) => {
    const { form } = this.state;
    const { email, mobileNo, address, firstName, DOB, gender, fatherName, lastName, id, country, file } = row.original;
    let obj = { email, mobileNo, address, firstName, DOB, gender, fatherName, lastName, id, country };
    this.setState({
      form: { ...form, ...obj }, crudData: true, file
    });
    this.fileArray = file;
  }

  toggleModal() {
    this.setState({ crudData: !this.state.crudData })
  }

  onInputChange(name, value) {
    this.setState({ form: { ...this.state.form, [name]: value } })
  }

  save() {
    const { form, file } = this.state;
    let obj = {
      ...form, file
    }
    this.props.editStudent(obj);
    this.toggleModal();
  }

  profileImageSelection = event => {
    let arr = event.target.files;
    this.fileObj = [...this.fileObj, ...arr];
    this.fileArray = [];
    for (let i = 0; i < this.fileObj.length; i++) {
      this.fileArray.push(URL.createObjectURL(this.fileObj[i]))
    }
    this.setState({ file: this.fileArray })
  }

  render() {
    const { form, crudData } = this.state;
    const { email, mobileNo, address, country, firstName, DOB, gender, fatherName, lastName } = form;
    const { students } = this.props;
    return (
      <div className="mt-5 mb-5 notesContainer">
        <div className="mb-3">
          <h2 className="heading mb-0 d-inline-flex">View-Students</h2>
          <Button color="secondary" className="float-right" onClick={() => this.props.history.push('/')} ><i className="fa fa-lg fa-plus mr-2"></i>Add More</Button>
        </div>
        <Table
          data={students}
          columns={this.ctColumns}
        />
        <Modal isOpen={crudData} size="xl" key="editStudent" toggle={() => this.toggleModal()}>
          <ModalHeader>Edit Student Details</ModalHeader>
          <ModalBody>
            <Row>
              <Col xs={6}>
                <FormGroup row>
                  <Col md="4" className="text-right mt-2">
                    <Label htmlFor="firstName">First Name</Label>
                  </Col>
                  <Col xs="12" md="7">
                    <Input
                      name="firstName"
                      placeholder="First Name"
                      value={firstName}
                      onChangeFunc={this.onInputChange}
                    />
                  </Col>
                </FormGroup>
                <FormGroup row>
                  <Col md="4" className="text-right mt-2">
                    <Label htmlFor="lastName">Last Name</Label>
                  </Col>
                  <Col xs="12" md="7">
                    <Input
                      name="lastName"
                      placeholder="Last Name"
                      value={lastName}
                      onChangeFunc={this.onInputChange}
                    />
                  </Col>
                </FormGroup>
                <FormGroup row>
                  <Col md="4" className="text-right mt-2">
                    <Label htmlFor="Mobile">Mobile No.</Label>
                  </Col>
                  <Col xs="12" md="7">
                    <Input
                      title="Mobile No."
                      name="mobileNo"
                      placeholder="Enter Mobile No."
                      value={mobileNo}
                      reqType="number"
                      onChangeFunc={this.onInputChange}
                    />
                  </Col>
                </FormGroup>
                <FormGroup row>
                  <Col md="4" className="text-right mt-2">
                    <Label htmlFor="Mobile">DOB</Label>
                  </Col>
                  <Col xs="12" md="7">

                    <Input type="date" name="DOB" placeholder="Enter Date of Birth"
                      value={DOB}
                      onChangeFunc={this.onInputChange}
                      title="Start Date"
                    />
                  </Col>
                </FormGroup>
              </Col>
              <Col xs={6}>
                <FormGroup row>
                  <Col md="4" className="text-right mt-2">
                    <Label htmlFor="email">Email</Label>
                  </Col>
                  <Col xs="12" md="7">
                    <Input
                      name="email"
                      placeholder="Email"
                      value={email}
                      disabled
                      onChangeFunc={this.onInputChange}
                      autoComplete="email"
                      title="Email"
                    />
                  </Col>
                </FormGroup>
                <FormGroup row>
                  <Col md="4" className="text-right mt-2">
                    <Label htmlFor="fatherName">Father Name</Label>
                  </Col>
                  <Col xs="12" md="7">
                    <Input
                      name="fatherName"
                      placeholder="Father Name"
                      value={fatherName}
                      onChangeFunc={this.onInputChange}
                    />
                  </Col>
                </FormGroup>
                <FormGroup row>
                  <Col md="4" className="text-right mt-2">
                    <Label htmlFor="fatherName">Gender</Label>
                  </Col>
                  <Col md='6' style={{ lineHeight: '40px' }}>
                    <label className="d-inline-flex mb-0">
                      <Input
                        type="radio"
                        name="gender"
                        value="male"
                        checked={gender === 'male'}
                        outerClassName="mr-2"
                        style={{ width: 20 }}
                        onChangeFunc={(name, value) => this.onInputChange(name, value)}
                      /> Male
          </label>
                    <label className="d-inline-flex ml-2 mb-0">
                      <Input
                        type="radio"
                        name="gender"
                        value="female"
                        checked={gender === 'female'}
                        outerClassName="mr-2"
                        style={{ width: 20 }}
                        onChangeFunc={(name, value) => this.onInputChange(name, value)}
                      /> Female
          </label>
                  </Col>
                </FormGroup>
                <FormGroup row>
                  <Col md="4" className="text-right mt-2">
                    <Label htmlFor="country">Country</Label>
                  </Col>
                  <Col xs="12" md="7">
                    <InputStrap type="select" id="country" onChange={(e) => this.onInputChange(e.target.id, e.target.value)} value={country || 'All'}>
                      <option value="All">All</option>
                      <option value="India">India</option>
                      <option value="USA">USA</option>
                      <option value="Canada">Canada</option>
                      <option value="UK">UK</option>
                      <option value="Australia">Australia</option>
                      <option value="Srilanka">Srilanka</option>
                    </InputStrap>
                  </Col>
                </FormGroup>
              </Col>
            </Row>
            <FormGroup row>
              <Col md="3" className="text-right mt-2">
                <Label htmlFor="address">Address</Label>
              </Col>
              <Col xs="12" md="7">
                <InputStrap
                  type='textarea'
                  name="address"
                  rows="5"
                  placeholder="Enter Address"
                  value={address}
                  onChange={(e) => this.onInputChange(e.target.name, e.target.value)}
                />
              </Col>
            </FormGroup>
            <div className="profileContainer mb-3">
              <Row>
                <Col xs={3}>
                  <input type="file" accept="image/*" multiple id="profileImg" onChange={this.profileImageSelection} />
                </Col>
                <Col xs={9}>
                  <div className="form-group multi-preview">
                    {(this.fileArray || []).map((url, i) => (
                      <img src={url} key={i} alt="..." className="profileImage" />
                    ))}
                  </div>
                </Col>
              </Row>
            </div>
          </ModalBody>
          <ModalFooter>
            <Button color="success" onClick={() => this.save()} >Save</Button>
            <Button onClick={() => this.toggleModal()}>Cancel</Button>
          </ModalFooter>
        </Modal>
      </div >
    );
  }
}

const mapStateToProps = state => ({
  students: state.students,
  studentDatail: state.studentDatail
});

export default connect(mapStateToProps, { getStudents, addStudent, editStudent, deleteStudent })(StudentList); 