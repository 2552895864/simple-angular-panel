import { MetricsPanelCtrl } from 'grafana/app/plugins/sdk';
import _ from 'lodash';

interface Circle {
  name: string;
  lat: number;
  lng: number;
  value: number;
  size: number;
  type: string;
}

const WIDTH_HEIGHT_RATE = 310 / 235;

export default class SimpleCtrl extends MetricsPanelCtrl {
  static templateUrl = 'partials/module.html';

  panelDefaults = {
    text: 'Hello World',
  };
  circleInfo: Circle[] = [];
  mapWidth = 0;
  mapHeight = 0;

  /** @ngInject */
  constructor($scope, $injector) {
    super($scope, $injector);
    _.defaultsDeep(this.panel, this.panelDefaults);

    (this as any).dataFormat = 'series';

    this.events.on('init-edit-mode', this.onInitEditMode.bind(this));
    this.events.on('panel-initialized', this.onRenderMap.bind(this));
    this.events.on('component-did-mount', this.onRenderMap.bind(this));
    this.events.on('render', this.onRender.bind(this));
    this.events.on('data-error', this.onDataError.bind(this));
  }

  onInitEditMode() {
    this.addEditorTab('Options', `public/plugins/${this.pluginId}/partials/options.html`, 2);
  }

  onRender() {
    if (!this.circleInfo || !this.circleInfo.length) {
      return;
    }

    // Tells the screen capture system that you finished
    this.renderingCompleted();
  }

  onDataError(err: any) {
    console.log('onDataError', err);
  }

  onRenderMap() {
    if (this.height) {
      this.mapHeight = this.height;
      this.mapWidth = WIDTH_HEIGHT_RATE * this.height;
    }
    this.render();
  }

  // 6.3+ get typed DataFrame directly
  handleDataFrame(data: any) {
    const values: Circle[] = [];
    for (const frame of data) {
      for (let i = 0; i < frame.rows.length; i++) {
        let name = frame.rows[i][0];
        let lat = frame.rows[i][1];
        let lng = frame.rows[i][2];
        let live = frame.rows[i][3];
        let host = +(name.split('_')[2]);
        let value = live / host;
        let isBig = value > 0.9;
        let size = isBig ? 38 : 26;
        let type = isBig ? 'big' : 'small';
        values.push({
          name,
          lat,
          lng,
          value,
          size,
          type,
        });
      }
    }
    console.log(values);
    this.circleInfo = values;
  }
}

export { SimpleCtrl as PanelCtrl };
