import { TestBed } from '@angular/core/testing';
import { ElementRef } from '@angular/core';
import { ImageUploadComponent } from './image-upload.component';
import { NotificationsService } from './../../core/notifications/notifications.service';
import { TranslateService } from '@ngx-translate/core';
import { of } from 'rxjs';
import { UtilsService } from '../../core/utils/utils.service';

class MockElementRef {}
class MockNotificationsService {}

class MockTranslateService {
  get(key: any): any {
    of(key);
  }
}

class MockUtilsService {}

describe('ImageUploadComponent', () => {
  let component: ImageUploadComponent;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        ImageUploadComponent,
        { provide: TranslateService, useClass: MockTranslateService },
        { provide: ElementRef, useClass: MockElementRef },
        { provide: NotificationsService, useClass: MockNotificationsService },
        { provide: UtilsService, useClass: MockUtilsService },
      ],
    });
    component = TestBed.get(ImageUploadComponent);
  });

  it('should create component', () => {
    expect(component).toBeDefined();
  });
});
