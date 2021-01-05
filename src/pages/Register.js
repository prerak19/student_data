import React, { Component } from 'react';
import { Row, Col, Card, FormGroup, Label, CardBody, Button, Input as InputStrap } from 'reactstrap';
import Input from '../common/components/input';
import { getStudents, addStudent, editStudent, deleteStudent } from '../Redux/action';
import { connect } from 'react-redux';
import { getFormDetails } from '../common/components/helper';

class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedFile: null,
      profileImage: null,
      file: [null],
      form: {
        id: Math.floor(Math.random() * 1000),
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
      }
    }

    this.fileObj = [];
    this.fileArray = [];
    this.onInputChange = this.onInputChange.bind(this);
    this.onInputValidate = this.onInputValidate.bind(this);
  }

  onInputChange(name, value) {
    this.setState({ form: { ...this.state.form, [name]: value } })
  }

  submitData() {
    const { form, file } = this.state;
    let validObj = getFormDetails(form, this.onInputValidate);
    if (validObj) {
      let obj = {
        ...form, file
      }
      this.props.addStudent(obj);
      this.props.history.push('/view-students')
    }
  }

  onInputValidate(name, error) {
    let errors = this.state.form.errors;
    errors[name] = error;
    this.setState({ form: { ...this.state.form, errors } })
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
    const { form } = this.state;
    const { email, mobileNo, address, firstName, country, DOB, gender, fatherName, lastName, errors } = form;
    return (
      <div className="login page-layout">
        <div className="content m-0 float-none w-100">
          <div className="box c-box">
            <Card className="br4">
              <CardBody>
                <h2>Student-Registration</h2>
                <p className="text-muted"></p>
                <div className="mb-3">
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
                            type="number"
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
                            value={email || ''}
                            onChangeFunc={this.onInputChange}
                            autoComplete="email"
                            title="Email"
                            isReq={true}
                            reqType='email'
                            error={errors.email}
                            validationFunc={this.onInputValidate}
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
                </div>
                <div className="profileContainer mb-3">
                  <Row>
                    <Col xs={3}>
                      <input type="file" accept="image/*" className="float-right" multiple id="profileImg" onChange={this.profileImageSelection} />
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
                <Row className="mt-4">
                  <Col xs="12">
                    <Button
                      color="primary"
                      className="px-4 float-right"
                      onClick={() => this.submitData()}
                    >Submit</Button>
                  </Col>
                </Row>
              </CardBody>
            </Card>
          </div>
        </div>
      </div >
    );
  }
}

const mapStateToProps = state => ({
  students: state.students,
  studentDatail: state.studentDatail
});

export default connect(mapStateToProps, { getStudents, addStudent, editStudent, deleteStudent })(Register); 