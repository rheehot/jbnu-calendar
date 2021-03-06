import React from 'react';
import PropTypes from 'prop-types';
import styles from './MainCalendar.scss';

import { Row, Col } from 'antd';

import Calendar from 'tui-calendar'; /* ES6 */
import 'tui-calendar/dist/tui-calendar.min.css';

import CalendarNavagation from 'components/CalendarNavagation';
import CalendarCheckDrawer from 'components/CalendarCheckDrawer';

class MainCalendar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentDate: new Date(),
      selectedCalendars: {},
    };
    this.calendar = null;
  }

  componentDidMount() {
    this.calendar = new Calendar(`#${this.props.id}`, {
      defaultView: 'month',
      taskView: false,
      useCreationPopup: false,
      useDetailPopup: true,
      usageStatistics: false,
      isReadOnly: this.props.isReadOnly,
      calendars: this.props.calendars,
      month: {
        daynames: ['일', '월', '화', '수', '목', '금', '토'],
      },
      template: {
        popupDetailBody: function(schedule) {
          return `
            <div>
              ${schedule.raw.url ? `<a href="${schedule.raw.url}" target="_blank">${schedule.raw.url}</a>` : ''}
              <p style="white-space: pre-line">${schedule.body}</p>
            </div>
          `;
        },
        monthGridHeaderExceed: function(hiddenSchedules) {
          return `
            <span class="${styles.More}">
              + ${hiddenSchedules}
            </span>
          `;
        },
      },
      theme: {
        'month.schedule.marginLeft': '4px',
        'month.schedule.marginRight': '4px',
      },
    });

    this.calendar.createSchedules(this.props.schedules);
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.selectedCalendars !== this.state.selectedCalendars || prevProps.schedules !== this.props.schedules) {
      this.resetSchedules();
    }

    if (prevProps.calendars !== this.props.calendars) {
      const selectedCalendars = this.props.calendars.reduce((obj, calendar) => {
        obj[calendar.id] = calendar.defaultChecked;
        return obj;
      }, {});
      this.setState({ selectedCalendars });
      this.calendar.setCalendars(this.props.calendars);
    }
  }

  resetSchedules = () => {
    const schedules = this.props.schedules.filter(schedule => {
      return this.state.selectedCalendars[schedule.calendarId];
    });
    this.calendar.clear();
    this.calendar.createSchedules(schedules, true);
    this.calendar.render();
  };

  handleCheckBox = values => {
    const selectedCalendars = values.reduce((obj, value) => {
      obj[value] = true;
      return obj;
    }, {});
    this.setState({ selectedCalendars });
  };

  handleTodayClick = () => {
    this.calendar.today();
    const currentDate = this.calendar.getDate().toDate();
    this.setState({ currentDate });
    this.props.onChange(currentDate);
  };

  handlePrevClick = () => {
    this.calendar.prev();
    const currentDate = this.calendar.getDate().toDate();
    this.setState({ currentDate });
    this.props.onChange(currentDate);
  };

  handleNextClick = () => {
    this.calendar.next();
    const currentDate = this.calendar.getDate().toDate();
    this.setState({ currentDate });
    this.props.onChange(currentDate);
  };

  render() {
    const dateText = `${this.state.currentDate.getFullYear()}.${this.state.currentDate.getMonth() + 1}`;
    const drawerText = this.props.calendars
      .filter(calendar => this.state.selectedCalendars[calendar.id])
      .map(calendar => calendar.name)
      .join(', ');
    return (
      <div className={styles.MainCalendar}>
        <Row className={styles.MainCalendar__header} type="flex" justify="space-between">
          <Col className={styles.MainCalendar__header__filterCol} xs={24} md={12}>
            {this.props.calendars.length > 0 && <CalendarCheckDrawer text={`필터링 중- ${drawerText}`} items={this.props.calendars} onChange={this.handleCheckBox} />}
          </Col>
          <Col className={styles.MainCalendar__header__navigationCol} xs={24} md={12}>
            <h1 className={styles.MainCalendar__header__navigationCol__date}>{dateText}</h1>
            <CalendarNavagation
              className={styles.MainCalendar__header__navigationCol__navigation}
              onTodayClick={this.handleTodayClick}
              onPrevClick={this.handlePrevClick}
              onNextClick={this.handleNextClick}
            />
          </Col>
        </Row>
        <div className={styles.MainCalendar__calendar} id={this.props.id} />
      </div>
    );
  }
}

MainCalendar.propTypes = {
  id: PropTypes.string,
  isReadOnly: PropTypes.bool,
  calendars: PropTypes.array,
  schedule: PropTypes.array,
  handleDateChange: PropTypes.func,
};
MainCalendar.defaultProps = {
  id: 'calendar',
  isReadOnly: true,
  calendars: [
    {
      id: 'AcademicSchedule',
      name: '학사 일정',
      color: '#ffffff',
      bgColor: '#ff5583',
      dragBgColor: '#ff5583',
      borderColor: '#ff5583',
    },
    {
      id: 'GeneralStudentCouncil',
      name: '총학생회',
      color: '#ffffff',
      bgColor: '#ffbb3b',
      dragBgColor: '#ffbb3b',
      borderColor: '#ffbb3b',
    },
    {
      id: 'EngineeringCollege',
      name: '공과대학',
      color: '#ffffff',
      bgColor: '#03bd9e',
      dragBgColor: '#03bd9e',
      borderColor: '#03bd9e',
    },
  ],
  schedules: [
    {
      id: '1',
      calendarId: 'Major Subject',
      title: '자료구조론',
      category: 'time', // 일반 일정
      start: '2019-12-27T10:00:00',
      end: '2019-12-27T11:00:00',
      body: '설명',
      location: '이건 위치',
      isReadOnly: true,
    },
    {
      id: '2',
      calendarId: 'Elective Subject',
      title: '웹 프로그래밍',
      category: 'time',
      start: '2019-12-27T14:00:00',
      end: '2019-12-27T15:00:00',
    },
    {
      id: '3',
      calendarId: 'Elective Subject',
      title: '인공지능',
      category: 'time',
      start: '2019-12-25T09:00:00',
      end: '2019-12-25T10:00:00',
    },
    {
      id: '4',
      calendarId: 'Major Subject',
      title: '소프트웨어 공학',
      category: 'time',
      dueDateClass: '',
      start: '2019-12-26T09:00:00',
      end: '2019-12-26T10:30:00',
    },
    {
      id: '5',
      calendarId: 'Elective Subject',
      title: '데이터베이스',
      category: 'time',
      start: '2019-12-26T10:30:00',
      end: '2019-12-26T12:00:00',
    },
    {
      id: '6',
      calendarId: 'Major Subject',
      title: '알고리즘',
      category: 'time',
      dueDateClass: '',
      start: '2019-12-28T13:00:00',
      end: '2019-12-28T14:30:00',
    },
    {
      id: '8',
      calendarId: 'Travel',
      title: '강촌 OT',
      category: 'allday', // 종일 일정
      start: '2019-12-29',
      end: '2019-12-30',
      color: '#ffffff',
      bgColor: '#ff4040', // 일정 색상을 직접 지정할 수 있어요
      dragBgColor: '#ff4040',
      borderColor: '#ff4040',
    },
  ],
  handleDateChange: v => v,
};

export default MainCalendar;
