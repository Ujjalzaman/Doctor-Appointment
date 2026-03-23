import React, { useState, useCallback } from 'react';
import { Modal, Upload, Button, Slider, message } from 'antd';
import { FaUpload, FaRedo, FaUndo } from 'react-icons/fa';
import Cropper from 'react-easy-crop';
import imageCompression from 'browser-image-compression';
import './ImageUploadWithCrop.css';

const ImageUploadWithCrop = ({ onImageCropped, aspect = 1, maxSizeMB = 1, cropShape = 'rect', visible, onCancel }) => {
    const [imageSrc, setImageSrc] = useState(null);
    const [crop, setCrop] = useState({ x: 0, y: 0 });
    const [zoom, setZoom] = useState(1);
    const [rotation, setRotation] = useState(0);
    const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);
    const [loading, setLoading] = useState(false);

    const onCropComplete = useCallback((croppedArea, croppedAreaPixels) => {
        setCroppedAreaPixels(croppedAreaPixels);
    }, []);

    const handleFileChange = async (file) => {
        const reader = new FileReader();
        reader.addEventListener('load', () => setImageSrc(reader.result));
        reader.readAsDataURL(file);
        return false;
    };

    const createImage = (url) =>
        new Promise((resolve, reject) => {
            const image = new Image();
            image.addEventListener('load', () => resolve(image));
            image.addEventListener('error', (error) => reject(error));
            image.src = url;
        });

    const getCroppedImg = async () => {
        try {
            const image = await createImage(imageSrc);
            const canvas = document.createElement('canvas');
            const ctx = canvas.getContext('2d');

            canvas.width = croppedAreaPixels.width;
            canvas.height = croppedAreaPixels.height;

            ctx.save();
            ctx.translate(canvas.width / 2, canvas.height / 2);
            ctx.rotate((rotation * Math.PI) / 180);
            ctx.translate(-canvas.width / 2, -canvas.height / 2);

            ctx.drawImage(
                image,
                croppedAreaPixels.x,
                croppedAreaPixels.y,
                croppedAreaPixels.width,
                croppedAreaPixels.height,
                0,
                0,
                canvas.width,
                canvas.height
            );

            ctx.restore();

            return new Promise((resolve) => {
                canvas.toBlob((blob) => {
                    resolve(blob);
                }, 'image/jpeg', 0.95);
            });
        } catch (e) {
            console.error('Error cropping image:', e);
            return null;
        }
    };

    const handleSave = async () => {
        try {
            setLoading(true);
            const croppedBlob = await getCroppedImg();

            if (!croppedBlob) {
                message.error('Failed to crop image');
                return;
            }

            const options = {
                maxSizeMB,
                maxWidthOrHeight: 1920,
                useWebWorker: true,
            };

            const compressedFile = await imageCompression(croppedBlob, options);
            const finalFile = new File([compressedFile], 'image.jpg', { type: 'image/jpeg' });

            onImageCropped(finalFile, URL.createObjectURL(compressedFile));
            
            setImageSrc(null);
            setCrop({ x: 0, y: 0 });
            setZoom(1);
            setRotation(0);
            message.success('Image processed successfully');
            onCancel();
        } catch (error) {
            message.error('Failed to process image');
            console.error('Error:', error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <Modal
            title="Upload and Crop Image"
            open={visible}
            onCancel={() => {
                setImageSrc(null);
                onCancel();
            }}
            footer={[
                <Button key="cancel" onClick={() => {
                    setImageSrc(null);
                    onCancel();
                }}>
                    Cancel
                </Button>,
                <Button
                    key="save"
                    type="primary"
                    onClick={handleSave}
                    disabled={!imageSrc}
                    loading={loading}
                >
                    Save Image
                </Button>,
            ]}
            width={700}
            className="image-crop-modal"
        >
            {!imageSrc ? (
                <Upload.Dragger
                    beforeUpload={handleFileChange}
                    showUploadList={false}
                    accept="image/*"
                >
                    <p className="ant-upload-drag-icon">
                        <FaUpload style={{ fontSize: '3rem', color: '#1977cc' }} />
                    </p>
                    <p className="ant-upload-text">Click or drag image to upload</p>
                    <p className="ant-upload-hint">
                        Support for JPG, PNG, GIF. Image will be compressed to {maxSizeMB}MB max.
                    </p>
                </Upload.Dragger>
            ) : (
                <div className="crop-container">
                    <div className="crop-area">
                        <Cropper
                            image={imageSrc}
                            crop={crop}
                            zoom={zoom}
                            rotation={rotation}
                            aspect={aspect}
                            onCropChange={setCrop}
                            onCropComplete={onCropComplete}
                            onZoomChange={setZoom}
                            onRotationChange={setRotation}
                            cropShape={cropShape}
                        />
                    </div>
                    <div className="crop-controls">
                        <div className="control-group">
                            <label>Zoom</label>
                            <Slider
                                value={zoom}
                                min={1}
                                max={3}
                                step={0.1}
                                onChange={setZoom}
                            />
                        </div>
                        <div className="control-group">
                            <label>Rotation</label>
                            <Slider
                                value={rotation}
                                min={0}
                                max={360}
                                onChange={setRotation}
                            />
                        </div>
                        <div className="control-actions">
                            <Button icon={<FaUndo />} onClick={() => setRotation(rotation - 90)}>
                                Rotate Left
                            </Button>
                            <Button icon={<FaRedo />} onClick={() => setRotation(rotation + 90)}>
                                Rotate Right
                            </Button>
                            <Button onClick={() => setImageSrc(null)}>
                                Change Image
                            </Button>
                        </div>
                    </div>
                </div>
            )}
        </Modal>
    );
};

export default ImageUploadWithCrop;
