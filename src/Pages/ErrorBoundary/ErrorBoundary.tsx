import React from 'react';
import { Result, Collapse, Button, Alert } from 'antd';
import { Link } from 'react-router-dom';
import paths from 'config/routes.json';

const { Panel } = Collapse;
interface Props {
  children: React.ReactChild | React.ReactChild[];
}

function refreshPage() {
  window.location.reload();
}

export class ErrorBoundary extends React.Component<Props> {
  state = {
    hasError: false,
    error: '',
    errorInfo: '',
  };

  componentDidCatch(error: any, errorInfo: any) {
    this.setState({
      hasError: true,
      error,
      errorInfo: errorInfo.componentStack,
    });
  }

  render() {
    if (this.state.hasError)
      return (
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            width: 'calc(100% - 65px)',
            maxWidth: '900px',
            margin: '20px auto',
          }}
        >
          <Result
            style={{
              padding: '20px 0px',
            }}
            status="404"
            title="Oooops!"
            subTitle="Something unexpected happened!"
          />
          <Button
            style={{
              marginBottom: '20px',
              alignSelf: 'center',
            }}
            onClick={refreshPage}
            type="primary"
          >
            <Link to={paths.home}>To main page...</Link>
          </Button>
          <Collapse>
            <Panel header="Details" key="1">
              <Alert
                message={this.state.error.toString()}
                description={this.state.errorInfo}
                type="error"
                showIcon
              />
            </Panel>
          </Collapse>
        </div>
      );

    return this.props.children;
  }
}
