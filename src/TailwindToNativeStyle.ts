import type { Styles } from './types/types';
import { promises as fs } from 'fs';
import * as path from 'path';
import eventEmitter from './eventEmitter';
import { getTailwindColor, getTailwindNumericValue } from './utils/utils';

export class TailwindToNativeStyle {
  constructor(public STYLE_PATH?: string) {
    this.STYLE_PATH = path.join(process.cwd(), 'src', 'styles');
    eventEmitter.on('generate', this.createStyle.bind(this));
  }

  private parseProps(props: string) {
    const name = props.split(':').shift()?.split('-').shift() ?? '';
    const fileName = props.split(':').shift()?.split('-').pop() ?? '';
    const classNames = new Set( props  .split(':') .pop()?.split(' ').filter((f) => f !== ''));
    return { name, fileName, classNames };
  }

  generate(props: string) {
    const { name, fileName, classNames } = this.parseProps(props);
    const main = this.mapClassesToStyles(classNames);
    const root: Styles = { [name]: main };
    eventEmitter.emit('generate', fileName, root);
  }



  private async createStyle(fileName: string, styles: Styles) {
    const data = new Uint8Array(Buffer.from(`import { StyleSheet } from 'react-native';export default StyleSheet.create(${JSON.stringify(styles)});`));
    await fs.writeFile(`${this.STYLE_PATH}/${fileName}`, data);
  }

  public async init() {
    try {
      await fs.readdir(this.STYLE_PATH);
    } catch (error) {
      fs.mkdir(this.STYLE_PATH);
    }
  }
    
  private mapClassesToStyles(classNames: Set<string>) {
    const main: { [key: string]: string | number } = {};

    classNames.forEach((className) => {
      const numericValue = getTailwindNumericValue(className);

      switch (true) {
        case className.startsWith('flex-'):
          main.flex = numericValue || 1;
          break;
        case className === 'justify-center':
          main.justifyContent = 'center';
          break;
        case className === 'items-center':
          main.alignItems = 'center';
          break;
        case className === 'text-center':
          main.textAlign = 'center';
          break;
        case className === 'text-left':
          main.textAlign = 'left';
          break;
        case className === 'text-right':
          main.textAlign = 'right';
          break;
        case className.startsWith('m-'):
          main.margin = numericValue ? numericValue * 4 : 0;
          break;
        case className.startsWith('p-'):
          main.padding = numericValue ? numericValue * 4 : 0;
          break;
        case className.startsWith('bg-'):
          const color = getTailwindColor(className);
          if (color) main.backgroundColor = color;
          break;
        case className.startsWith('rounded-'):
          main.borderRadius = numericValue ? numericValue * 4 : 8;
          break;
        default:
          console.warn( `Class ${className} is not recognized and will be ignored.`);
      }
    });

    return main;
  }
}
