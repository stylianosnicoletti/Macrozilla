import { CUSTOM_ELEMENTS_SCHEMA, NgZone } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { Platform } from '@ionic/angular';
import { AppComponent } from './app.component';
import {  Subject } from 'rxjs';

describe('AppComponent', () => {

  let statusBarSpy;
  //let splashScreenSpy;
  let platformReadySpy;
  let platformPauseResumeSubject: Subject<void>;
  let platformSpy;


  beforeEach((() => {
    //statusBarSpy = jasmine.createSpyObj('StatusBar', ['styleDefault']);
    //splashScreenSpy = jasmine.createSpyObj('SplashScreen', ['hide']);
    platformReadySpy = Promise.resolve();
    platformPauseResumeSubject =  new Subject();
    platformSpy = jasmine.createSpyObj('Platform',
                  {ready: platformReadySpy},
                  {pause: platformPauseResumeSubject.asObservable(), resume: platformPauseResumeSubject.asObservable() });


    TestBed.configureTestingModule({
      declarations: [AppComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      providers: [
        //{ provide: StatusBar, useValue: statusBarSpy },
        //{ provide: SplashScreen, useValue: splashScreenSpy },
        { provide: Platform, useValue: platformSpy }
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
    //expect(statusBarSpy.styleDefault).toHaveBeenCalled();
    //expect(splashScreenSpy.hide).toHaveBeenCalled();
  });

  // TODO: add more tests!

});
