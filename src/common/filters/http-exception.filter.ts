import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus
} from '@nestjs/common'
import { Request, Response } from 'express'

@Catch()
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp()
    const response = ctx.getResponse<Response>()
    const request = ctx.getRequest<Request>()

    let status =
      exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR

    let message =
      exception instanceof HttpException
        ? exception.message || null
        : 'Internal server error'

    let error =
      exception instanceof HttpException
        ? (exception.getResponse() as any)
        : exception

    // If the exception response is an object with message field
    if (error && typeof error === 'object' && error.message) {
      message = error.message
    }

    response.status(status).json({
      success: false,
      data: null,
      message,
      meta: {
        path: request.url,
        timestamp: new Date().toISOString()
      },
      error
    })
  }
}
