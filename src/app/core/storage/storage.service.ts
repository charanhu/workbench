import { Settings } from '../../modules/settings/settings.model';
import { Injectable } from '@angular/core';
import { LocalStorage } from '@ngx-pwa/local-storage';
import { NotificationsService } from '../notifications/notifications.service';
import { ProjectStorage, SourceStorage, FacsimileStorage } from './storage.model';
import { projectListStorageSchema, projectStorageSchema, settingsStorageSchema, sourceStorageSchema, facsimileStorageSchema } from './storage.schema';
import { TranslateService } from '@ngx-translate/core';

@Injectable()
export class StorageService {
  // https://developers.google.com/web/fundamentals/instant-and-offline/web-storage/indexeddb-best-practices

  constructor (
    private storage: LocalStorage,
    private notificationsService: NotificationsService,
    private translate: TranslateService
  ) {
  }

  loadProjectList (): Promise<Array<ProjectStorage['id']>> {
    return this.storage.getItem('project-list', projectListStorageSchema)
      .toPromise()
      .then((data: Array<ProjectStorage['id']>) => {
        // If this does not exist yet then create it
        if (!data) {
          return this.storage.setItem('project-list', [])
            .toPromise()
            .then(success => [], err => {
              this.errorHandler(err);
              return [];
            });
        }
        return data;
      }, err => {
        this.errorHandler(err);
        return [];
      });
  }

  saveProjectList (ids: Array<ProjectStorage['id']>): Promise<boolean> {
    return this.storage.setItem('project-list', ids)
      .toPromise()
      .catch(err => {
        this.errorHandler(err);
        return false;
      });
  }

  loadProject (id: ProjectStorage['id']): Promise<ProjectStorage> {
    return this.storage.getItem(`project:${ id }`, projectStorageSchema)
      .toPromise()
      .then((project: ProjectStorage) => {
        if (project) {
          return project;
        }
        this.errorHandler(this.translate.instant('CORE.STORAGE.ERROR.PROJECT', { id: id }));
        return null;
      }, err => {
        this.errorHandler(err);
        return null;
      });
  }

  saveProject (project: ProjectStorage): Promise<boolean> {
    return this.storage.setItem(`project:${ project.id }`, project)
      .toPromise()
      .catch(err => {
        this.errorHandler(err);
        return false;
      });
  }

  deleteProject (id: ProjectStorage['id']): Promise<boolean> {
    return this.storage.removeItem(`project:${ id }`)
      .toPromise()
      .catch(err => {
        this.errorHandler(err);
        return false;
      });
  }

  loadSource (id: SourceStorage['id']): Promise<SourceStorage> {
    return this.storage.getItem(`source:${ id }`, sourceStorageSchema)
      .toPromise()
      .then((source: SourceStorage) => {
        if (source) {
          return source;
        }
        this.errorHandler(this.translate.instant('CORE.STORAGE.ERROR.SOURCE', { id: id }));
        return null;
      }, err => {
        this.errorHandler(err);
        return null;
      });
  }

  saveSource (source: SourceStorage): Promise<boolean> {
    return this.storage.setItem(`source:${ source.id }`, source)
      .toPromise()
      .catch(err => {
        this.errorHandler(err);
        return false;
      });
  }

  deleteSource (id: SourceStorage['id']): Promise<boolean> {
    return this.storage.removeItem(`source:${ id }`)
      .toPromise()
      .catch(err => {
        this.errorHandler(err);
        return false;
      });
  }

  loadFacsimile (id: FacsimileStorage['id']): Promise<FacsimileStorage> {
    return this.storage.getItem(`facsimile:${ id }`, facsimileStorageSchema)
      .toPromise()
      .then((facsimile: FacsimileStorage) => {
        if (facsimile) {
          return facsimile;
        }
        this.errorHandler(this.translate.instant('CORE.STORAGE.ERROR.FACSIMILIE', { id: id }));
        return null;
      }, err => {
        this.errorHandler(err);
        return null;
      });
  }

  saveFacsimile (facsimile: FacsimileStorage): Promise<boolean> {
    return this.storage.setItem(`facsimile:${ facsimile.id }`, facsimile)
      .toPromise()
      .catch(err => {
        this.errorHandler(err);
        return false;
      });
  }

  deleteFacsimile (id: FacsimileStorage['id']): Promise<boolean> {
    return this.storage.removeItem(`facsimile:${ id }`)
      .toPromise()
      .catch(err => {
        this.errorHandler(err);
        return false;
      });
  }

  loadSettings (): Promise<Settings> {
    return this.storage.getItem(`settings`, settingsStorageSchema)
      .toPromise()
      .then((settings: Settings) => {
        if (settings) {
          return settings;
        }
        return null;
      }, err => {
        this.errorHandler(err);
        return null;
      });
  }

  saveSettings (settings: Settings): Promise<boolean> {
    return this.storage.setItem(`settings`, settings)
      .toPromise()
      .catch(err => {
        this.errorHandler(err);
        return false;
      });
  }

  private errorHandler (err): void {
    this.notificationsService.error(this.translate.instant('CORE.STORAGE.ERROR.STORAGE') + err);
    console.warn(this.translate.instant('CORE.STORAGE.ERROR.STORAGE'), err);
  }

}
