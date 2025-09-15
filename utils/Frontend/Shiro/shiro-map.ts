import { LitElement, html, css, PropertyValues } from "lit";
import {
  customElement,
  property,
  queryAssignedElements,
} from "lit/decorators.js";

interface DataItem {
  [key: string | number]: any;
}

interface DataItemTree {
  [key: string | number]: DataItem;
}

@customElement("shiro-map")
class ShiroMap extends LitElement {
  @property({ type: Function })
  callback!: () => Promise<DataItem[]>;

  @queryAssignedElements()
  _getSlotted!: Array<HTMLElement>;

  async firstUpdated() {
    //console.log('hi (shiro-map firt update)')
    const callbackName = this.callback;
    //console.log(callbackName)
    if (callbackName) {
      this.callback = new Function(`return ${callbackName}`)() as () => Promise<
        DataItem[]
      >;
      //console.log(this.callback)
      this.runCallback();
    }
  }

  async runCallback() {
    const data = await this.callback();
    this.renderData(data);
  }

  renderData(data: DataItem[]) {
    //TODO: add error for not receiving data or not being able to access
    console.log(`[shiro-map - renderData()] I received ${data.length} items`);
    let template: HTMLElement;
    this._getSlotted.every((slt) => {
      console.log(
        `[shiro-map - renderData()] slottedChildren: ${Array.from(
          slt.querySelectorAll("*")
        )}`
      );
      const find = Array.from(slt.querySelectorAll("*")).find(
        (el) => (el as HTMLElement).dataset.mapstart === ""
      );
      if (find !== undefined) {
        template = find as HTMLElement;
        return false;
      } else {
        return true;
      }
    });
    console.log(`[shiro-map - renderData()] slotted:`);
    console.log(this._getSlotted);
    console.log(`[shiro-map - renderData()] mapstart element (to be cloned):`);
    console.log(template!);
    if (!template!) return;

    data.forEach((item) => {
      const newElement = template.cloneNode(true) as HTMLElement;

      console.log(`[shiro-map - renderData()] clonedElement:`);
      console.log(newElement);

      newElement.querySelectorAll("[data-map]").forEach((cell) => {
        const attributeName = (cell as HTMLElement).dataset.map as string;
        if (attributeName in item) {
          cell.textContent = item[attributeName];
        } else if (attributeName.match(".")) {
          //console.log(`[shiro-map - renderData()] attributeTree detected`);
          const attributeNameTree: any[] = attributeName.split(".");
          //console.log(`[shiro-map - renderData()] attributeNameTree:`);
          //console.log(attributeNameTree);
          let attributeData: DataItemTree | string;
          attributeData = item[attributeNameTree[0]];
          /*
          console.log(
            `[shiro-map - renderData()] attributeeeeeDataaaaaaa:`
          );
          */
          //console.log(attributeData)
          for (let i = 1; i < attributeNameTree.length; i++) {
            attributeData = attributeData[attributeNameTree[i]];
            /*
            console.log(
              `[shiro-map - renderData()] attributeeeeeDataaaaaaa:`
            );
            */
            //console.log(attributeData)
          }
          cell.textContent = attributeData+'';
        }
      });

      template.parentNode?.insertBefore(newElement, template);
    });

    template.remove();
  }

  render() {
    return html` <slot></slot> `;
  }
}