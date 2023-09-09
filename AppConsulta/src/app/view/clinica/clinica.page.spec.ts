import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ClinicaPage } from './clinica.page';

describe('ClinicaPage', () => {
  let component: ClinicaPage;
  let fixture: ComponentFixture<ClinicaPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(ClinicaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
