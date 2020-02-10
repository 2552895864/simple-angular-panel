import { MetricsPanelCtrl } from 'grafana/app/plugins/sdk';
import _ from 'lodash';
import './css/module.css';
import { PanelEvents } from '@grafana/data';
// import drawLine from './utils/drawLine.js';

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

    this.events.on(PanelEvents.editModeInitialized, this.onInitEditMode.bind(this));
    this.events.on(PanelEvents.panelSizeChanged, this.onPanelSizeChanged.bind(this));
    this.events.on(PanelEvents.viewModeChanged, this.onViewModeChanged.bind(this));
    this.events.on(PanelEvents.refresh, this.onRefresh.bind(this));
    this.events.on(PanelEvents.panelInitialized, this.onPanelInitialized.bind(this));
    this.events.on(PanelEvents.componentDidMount, this.onComponentDidMount.bind(this));
    this.events.on(PanelEvents.render, this.onRender.bind(this));
    this.events.on(PanelEvents.dataReceived, this.onDataReceived.bind(this));
    this.events.on(PanelEvents.dataError, this.onDataError.bind(this));
  }

  onInitEditMode() {
    this.addEditorTab('Options', `public/plugins/${this.pluginId}/partials/options.html`, 2);
    console.log('editModeInitialized');
  }

  onPanelSizeChanged(){
    console.log('panelSizeChanged');
  }

  onViewModeChanged(){
    console.log('viewModeChanged');
  }

  onRefresh(){
    console.log('refresh');
  }

  onDataReceived(){
    console.log('dataReceived');
  }

  onRender() {
    if (!this.circleInfo || !this.circleInfo.length) {
      return;
    }
    console.log('render');
    // Tells the screen capture system that you finished
    this.renderingCompleted();
  }

  onDataError(err: any) {
    console.log('onDataError', err);
    console.log('dataError');
  }

  onPanelInitialized() {
    if (this.height) {
      this.mapHeight = this.height;
      this.mapWidth = WIDTH_HEIGHT_RATE * this.height;
    }
    console.log('panelInitialized');
    this.render();
  }

  onComponentDidMount() {
    if (this.height) {
      this.mapHeight = this.height;
      this.mapWidth = WIDTH_HEIGHT_RATE * this.height;
    }
    console.log('componentDidMount');
    this.render();
  }

  // 6.3+ get typed DataFrame directly
  handleDataFrame(data: any) {
    const circles: Circle[] = [];
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
        circles.push({
          name,
          lat,
          lng,
          value,
          size,
          type,
        });
      }
    }
    this.circleInfo = circles;
  }
}

export { SimpleCtrl as PanelCtrl };
