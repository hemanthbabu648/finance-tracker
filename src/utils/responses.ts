export class BaseResponse  {
    statusCode: number;
    message: string;

    constructor(statusCode: number, message: string) {
        this.statusCode = statusCode;
        this.message = message;
    }
}

// export class SuccessResponse extends BaseResponse {
//     data?: unknown;

//     constructor( statusCode: string, message: string, data?: unknown) {
//         super(statusCode);
//         super('success', message);
//         this.data = data;
        
//     }
// }

// export class ErrorResponse extends BaseResponse {
//     constructor( status: string, message: string) {
//         super( status);
//         super('error', message);
//     }
// }