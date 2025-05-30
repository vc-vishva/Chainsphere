import { Inject, Injectable, Logger } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { glob } from 'glob';
import { stat, unlink } from 'fs/promises';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';

/**
 * Description - This service will check the log files every 24 hours if the file is older then one month then delete that file
 */
@Injectable()
export class LogCleanerService {
  constructor(@Inject(WINSTON_MODULE_PROVIDER) private logger: Logger) {}

  @Cron(CronExpression.EVERY_DAY_AT_11PM) // Set the cron expression for every day at 3 AM
  async cleanupOldLogs(): Promise<void> {
    try {
      const logPattern: string = `logs/*.log`;

      const files: string[] = await glob(logPattern);

      const currentTime: number = new Date().getTime();
      const threshold: number = 24 * 60 * 60 * 1000; // 24 hours in milliseconds

      for (const file of files) {
        const fileStats = await stat(file);
        const fileModifiedTime: number = fileStats.mtime.getTime();

        if (currentTime - fileModifiedTime > threshold) {
          // Remove the old log file
          await unlink(file);
          this.logger.debug('Successfully removed old log files', file);
        }
      }
    } catch (error) {
      this.logger.error('Error cleaning up old log files:', error);
    }
  }
}
