import { MetricsPanelCtrl } from 'grafana/app/plugins/sdk';
import _ from 'lodash';
import './css/module.css';
import drawLine from './utils/drawLine.js';

interface Circle {
  name: string;
  lat: number;
  lng: number;
  value: number;
  size: number;
  type: string;
}

const WIDTH_HEIGHT_RATE = 310 / 235;
const BIG_LIMIT = 0.9;

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
    setTimeout(() => {
      const points = Array.prototype.slice.call(document.querySelectorAll('.point'));
      const container = document.querySelector('.map-container');
      if (points && points.length) {
        let flag = true;
        for (let i = 0; i < points.length; i++) {
          const point = points[i];
          drawLine(
            point,
            {
              x: point.offsetLeft + (flag ? 300 : -300),
              y: point.offsetTop,
            },
            container
          );
          flag = !flag;
        }
      }
    }, 0);
    this.render();
  }

  // 6.3+ get typed DataFrame directly
  handleDataFrame(data: any) {
    const values: Circle[] = [];
    for (const frame of data) {
      for (let i = 0; i < frame.rows.length; i++) {
        const name = frame.rows[i][0];
        const lat = frame.rows[i][1];
        const lng = frame.rows[i][2];
        const live = frame.rows[i][3];
        const host = +name.split('_')[2];
        const value = live / host;
        const isBig = value > BIG_LIMIT;
        const size = isBig ? 38 : 26;
        const type = isBig ? 'big' : 'small';
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
    this.circleInfo = values;
  }
}

export { SimpleCtrl as PanelCtrl };
