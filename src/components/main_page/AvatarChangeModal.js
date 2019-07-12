import React from 'react'
import { connect } from 'react-redux'
import { Row, Col, Modal, Upload, Icon, message } from 'antd';
import { upload_avatar } from '../../redux/actions'



function getBase64(file) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = error => reject(error);
    });
}

class PicturesWall extends React.Component {
    imagePassTest = true;
    fileName = "";
    fileType = "";
    imgContent = "";
    state = {
        previewVisible: false,
        previewImage: '',
        fileList: [],
        outerModalLoading: false
    };
    beforeUpload = (file) => {
        this.fileName = file.name;
        this.fileType = file.type;

        const isImg = /image/.test(file.type);
        if (!isImg) {
            message.error('请上传图片文件!');
        }
        const isLt2M = file.size / 1024 / 1024 < 2;
        if (!isLt2M) {
            message.error('头像图片大小必须小于2M!');
        }
        this.imagePassTest = isImg && isLt2M;
        return this.imagePassTest;
    }
    handleCancel = () => this.setState({ previewVisible: false });

    handlePreview = async file => {
      if (!file.url && !file.preview) {
        file.preview = await getBase64(file.originFileObj);
      }

      this.setState({
        previewImage: file.url || file.preview,
        previewVisible: true,
      });
    };

    handleChange = ({ file, fileList }) => {
        if (!this.imagePassTest) {
            this.setState({ fileList: [] });
            this.imagePassTest = true;
        }
        else {
          this.setState({ fileList });
          if(file.status==="done"){
            this.imgContent =file.thumbUrl || file.url;
          }
        }
    }
    handleSave = async () => {
        if (this.state.fileList.length > 0) {
            let payload = {};
            payload.id = sessionStorage.getItem("id");
            this.imgContent=this.imgContent.slice(this.imgContent.indexOf(",")+1);
            payload.img = this.imgContent;
            let arr=this.fileName.split(".");
            let newFileName="avatar."+arr[1];
            payload.fileName = newFileName;
            payload.fileType = this.fileType;
            this.setState({ outerModalLoading: true });
            this.props.avatarChangeRequest(payload);
        } else {
            this.props.onCancel();
        }
    };
    componentDidUpdate(prevProps) {
        if (prevProps.phase !== this.props.phase) {
            switch (this.props.phase) {
                case upload_avatar.types.SUCCESS:
                    this.setState({ outerModalLoading: false });
                    this.props.onCancel();
                    break;
                case upload_avatar.types.ERROR:
                    this.setState({ outerModalLoading: false });
                    message.error("网络或系统错误,头像保存失败！");
                    break;
                default: ;
            }
        }
    }
    render() {
        const { visible, onCancel } = this.props;
        const { previewVisible, previewImage, fileList, outerModalLoading } = this.state;
        const uploadButton = (
            <div>
                <Icon type="plus" />
                <div className="ant-upload-text">Upload</div>
            </div>
        );
        return (
            <Modal
                visible={visible}
                title="上传头像"
                okText="保存"
                cancelText="取消"
                confirmLoading={outerModalLoading}
                onCancel={onCancel}
                onOk={this.handleSave}
                destroyOnClose={true}
            >
                <Row type="flex" justify="center" align="middle">
                <Col>
                    <Upload
                        action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                        listType="picture-card"
                        fileList={fileList}
                        beforeUpload={this.beforeUpload}
                        onPreview={this.handlePreview}
                        onChange={this.handleChange}
                    >
                        {fileList.length >= 1 ? null : uploadButton}
                    </Upload>
                    <Modal visible={previewVisible} footer={null} onCancel={this.handleCancel}>
                        <img alt="example" style={{ width: '100%' }} src={previewImage} />
                    </Modal>
                    </Col>
                </Row>
            </Modal>
        );
    }
}

function mapStateToProps(state) {
    return { "phase": state.user.phase };
}
export default connect(mapStateToProps, { avatarChangeRequest: upload_avatar.request })(PicturesWall);