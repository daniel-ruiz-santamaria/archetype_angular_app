
import { Injectable, InjectionToken, Injector } from '@angular/core';
import { Overlay, OverlayConfig, OverlayRef } from '@angular/cdk/overlay';
import { ComponentPortal, ComponentType, PortalInjector } from '@angular/cdk/portal';
import { Subject } from 'rxjs';

interface MyOverlayConfig {
  panelClass?: string;
  hasBackdrop?: boolean;
  backdropClass?: string;
  disableClose?: boolean;
  data?: any;
  height?: string | number;
  width?: string | number
}

const DEFAULT_CONFIG: MyOverlayConfig = {
  hasBackdrop: true,
  backdropClass: 'my-coupons-overlay-backdrop',
  panelClass: 'my-coupons-overlay-panel'
}

export const MY_OVERLAY_DATA = new InjectionToken<any>('MY_OVERLAY_DATA');

@Injectable({
  providedIn: 'root'
})
export class CustomModalService {
  

  constructor(
    private injector: Injector,
    private overlay: Overlay
    ) {
    
  }

  private getOverlayConfig(config: MyOverlayConfig): OverlayConfig {
    const positionStrategy = this.overlay.position()
      .global()
      .centerHorizontally()
      .centerVertically();

    return new OverlayConfig({
      hasBackdrop: config.hasBackdrop,
      backdropClass: config.backdropClass,
      panelClass: config.panelClass,
      height: config.height,
      width: config.width,
      scrollStrategy: this.overlay.scrollStrategies.block(),
      positionStrategy
    });
  }

  private createOverlay(config: MyOverlayConfig): OverlayRef {
    const overlayConfig = this.getOverlayConfig(config);

    return this.overlay.create(overlayConfig)
  }

  private createInjector(config: MyOverlayConfig, dialogRef: MyOverlayRef): PortalInjector {
    const injectionTokens = new WeakMap();

    injectionTokens.set(MyOverlayRef, dialogRef);
    injectionTokens.set(MY_OVERLAY_DATA, config.data);

    return new PortalInjector(this.injector, injectionTokens);
  }

  open(config: MyOverlayConfig, component: ComponentType<any>) {
    const dialogConfig = { ...DEFAULT_CONFIG, ...config };
    const overlay = this.createOverlay(dialogConfig);
    const dialogRef = new MyOverlayRef(overlay);
    const injector = this.createInjector(dialogConfig, dialogRef)
    const portal = new ComponentPortal(component, null, injector);

    overlay.attach(portal);
    overlay.backdropClick().subscribe(() => {
      if(!config.disableClose){
        dialogRef.close()
      }
      dialogRef.backdropClick.next(true)
    });

    return dialogRef;
  }

}


export class MyOverlayRef {
  afterClosed = new Subject<any>();
  backdropClick = new Subject<any>();
  constructor(private overlayRef: OverlayRef) { }
  close(data?: any): void {
    this.overlayRef.dispose();
    this.afterClosed.next(data);
    this.afterClosed.complete();
  }
}