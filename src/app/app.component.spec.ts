import { CUSTOM_ELEMENTS_SCHEMA, NgZone } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { AppComponent } from './app.component';
import { AngularFireDatabase } from '@angular/fire/database';
import { Observable, Subject } from 'rxjs';
import { Mock } from 'protractor/built/driverProviders';

describe('AppComponent', () => {

  let statusBarSpy;
  let splashScreenSpy;
  let platformReadySpy;
  let platformPauseResumeSubject: Subject<void>;
  let platformSpy;
  let angularFireDatabaseGoOfflineSpy;
  let angularFireDatabaseGoOnlineSpy;
  let angularFireDatabaseSpy;

  beforeEach((() => {
    statusBarSpy = jasmine.createSpyObj('StatusBar', ['styleDefault']);
    splashScreenSpy = jasmine.createSpyObj('SplashScreen', ['hide']);
    platformReadySpy = Promise.resolve();
    platformPauseResumeSubject =  new Subject();
    platformSpy = jasmine.createSpyObj('Platform',
                  {ready: platformReadySpy},
                  {pause: platformPauseResumeSubject.asObservable(), resume: platformPauseResumeSubject.asObservable() });
    angularFireDatabaseGoOfflineSpy = jasmine.any;
    angularFireDatabaseGoOnlineSpy = jasmine.any;
    angularFireDatabaseSpy = jasmine.createSpyObj('AngularFireDatabase.database', { goOffline: angularFireDatabaseGoOfflineSpy, goOnline: angularFireDatabaseGoOnlineSpy});

    TestBed.configureTestingModule({
      declarations: [AppComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      providers: [
        { provide: StatusBar, useValue: statusBarSpy },
        { provide: SplashScreen, useValue: splashScreenSpy },
        { provide: Platform, useValue: platformSpy },
        { provide: AngularFireDatabase, useValue: angularFireDatabaseSpy }
      ],
    }).compileComponents();
  }));

  it('Should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  });

  it('Should initialize the app', async () => {
    TestBed.createComponent(AppComponent);
    expect(platformSpy.ready).toHaveBeenCalled();
    await platformReadySpy;
    expect(statusBarSpy.styleDefault).toHaveBeenCalled();
    expect(splashScreenSpy.hide).toHaveBeenCalled();
  });

  // TODO: add more tests!

});
