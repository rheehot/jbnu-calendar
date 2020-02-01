import React from 'react';
import PropTypes from 'prop-types';
import styles from './ScheduleRequest.scss';

import axios from 'axios';

import { Row, Col } from 'antd';

import Layout from 'components/Layout';
import ScheduleForm from 'components/ScheduleForm';
import ScheduleTable from 'components/ScheduleTable';

class ScheduleRequest extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      calendars: [],
      schedules: [],
    };
  }

  componentDidMount = () => {
    this.fetchCalendars();
  };

  fetchCalendars = () => {
    axios.get('/api/v1/calendars').then(res => {
      this.setState({ calendars: res.data });
    });
  };

  handleSubmit = ({ calendarId, title, body, location, url, start, end, allDay }) => {
    const data = {
      calendarId,
      title,
      body,
      location,
      url,
      start,
      end,
      allDay,
    };
    axios.post('/api/v1/schedules', data).then(res => {
      const newSchedule = res.data;
      this.setState({ schedules: [...this.state.schedules, newSchedule] });
    });
  };

  render() {
    return (
      <Layout activePage="request">
        <Row className={styles.ScheduleRequest__row} gutter={24} type="flex" justify="center">
          <Col xs={24} md={12} lg={10} xl={8}>
            <p>
              전북대 캘린더는 전북대학교의 모든 일정을 모아보는 캘린더입니다.
              <br />
              학교 공식 홈페이지에서는 알 수 없는 축제 기간, 동아리 모집 기간, 간식 사업 날짜 등등
              <br />
              학교에 관련된 모든 일정을 모으는 것을 목표로 하고 있습니다.
            </p>
            <p>
              등록되지 않은 학교의 일정이 있다면
              <br />
              언제든지 해당 양식을 이용해 등록 요청을 해주세요!
              <br />
              전북대 캘린더는 모두와 함께 만들어갑니다.
            </p>
          </Col>
          <Col xs={24} md={12} lg={10} xl={8}>
            <ScheduleForm categories={this.state.calendars} onSubmit={this.handleSubmit} />
          </Col>
        </Row>
      </Layout>
    );
  }
}

ScheduleRequest.propTypes = {};
ScheduleRequest.defaultProps = {};

export default ScheduleRequest;