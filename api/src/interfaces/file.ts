export type IUpload = {
    fieldname: string,
    originalname: string,
    encoding: string,
    mimetype: string,
    destination: string,
    filename: string,
    path: string,
    size: number
}
export type ICloudinaryResponse = {
    asset_id: string,
    public_id: string,
    version: number,
    version_id: string,
    signature: string,
    width: number,
    height: number,
    format: string,
    resource_type: string,
    created_at: string,
    tags: string[],
    bytes: number,
    type: string,
    etag: string,
    placeholder: boolean,
    url: string,
    secure_url: string,
    folder: string,
    original_filename: string,
    api_key: string
}