import { MetricsPanelCtrl } from 'grafana/app/plugins/sdk';
import _ from 'lodash';
import { DataFrame } from '@grafana/data';

interface Circle {
  key: string;
  value: any;
}

export default class SimpleCtrl extends MetricsPanelCtrl {
  static templateUrl = 'partials/module.html';

  panelDefaults = {
    text: 'Hello World',
  };
  circleInfo: Circle[] = [];

  /** @ngInject */
  constructor($scope, $injector) {
    super($scope, $injector);
    _.defaultsDeep(this.panel, this.panelDefaults);

    (this as any).dataFormat = 'series';

    this.events.on('init-edit-mode', this.onInitEditMode.bind(this));
    this.events.on('panel-initialized', this.render.bind(this));
    this.events.on('component-did-mount', this.render.bind(this));
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

  // 6.3+ get typed DataFrame directly
  handleDataFrame(data: DataFrame[]) {
    const values: Circle[] = [];
    for (const frame of data) {
      // const keys = frame.fields.map(ele=>ele.name);
      console.log(frame);
      console.log(Array.prototype.slice.call(frame["rows"]));
      // for (let i = 0; i < frame.rows.length; i++){
      //   let obj = {
      //     name: '',
      //     lat: 0,
      //     lng: 0,
      //     value: 0,
      //   };
      //   for(let j = 0; j < frame.rows[i].length; j++){
      //     obj = {
      //       ...obj,
      //       [keys[j]]: frame.rows[i][j],
      //     };
      //   }
      //   values.push(obj);
      // }
    }
    console.log(values);
    this.circleInfo = values;
  }
}

export { SimpleCtrl as PanelCtrl };
