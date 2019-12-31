
export default (editor, config = {}) => {
  const domc = editor.DomComponents;
  const defaultType = domc.getType('default');
  const defaultModel = defaultType.model;
  const defaultView = defaultType.view;

  const inputTypes = [
    {value: 'text', name: 'Text'},
    {value: 'email', name: 'Email'},
    {value: 'password', name: 'Password'},
    {value: 'number', name: 'Number'},
  ];
  
  // The `input` will be the Component type ID
  domc.addType('input', {
    // Define the Model
    model: defaultModel.extend({
      // Extend default properties
      defaults: Object.assign({}, defaultModel.prototype.defaults, {
        // Can be dropped only inside `form` elements
        draggable: 'form, form *',
        // Can't drop other elements inside it
        droppable: false,
        removable: false,
        copyable: false,
        // Traits (Settings)
        traits: ['name', 'placeholder', {
            // Change the type of the input (text, password, email, etc.)
            type: 'select',
            label: 'Type',
            name: 'type',
            options: inputTypes,
          },{
            // Can make it required for the form
            type: 'checkbox',
            label: 'Required',
            name: 'required',
        }],
      }),
    },
    {
      isComponent: function(el) {
        if(el.tagName == 'INPUT'){
          return {type: 'input'};
        }
      },
    }),
  
    // Define the View
    view: defaultView,
  });

  domc.addType('bullets', {
    isComponent: el => el.tagName === 'ul',
    model: {
      defaults: {
        tagName: 'ul',
        attributes: {
          'data-gjs-type': 'bullets',
        },
        components: {
          tagName: 'li',
          content: 'Insert text here',
        },
        traits: [
          {type: 'number', name: 'topMargin', label: 'Margin', changeProp: 1},
          {
            type: 'select',
            name: 'listType',
            label: 'List Type:',
            options: [{id: 'ul', name: 'Unordered List'}, {id: 'ol', name: 'Ordered List'}],
            changeProp: 1
          },
          {
            type: 'select',
            name: 'fontFamily',
            label: 'Font Family',
            options: [
              {id: 'Arial, Helvetica, sans-serif"', name: 'Arial'},
              {id: 'Arial Black, Gadget, sans-serif', name: 'Arial Black'},
              {id: 'Brush Script MT, sans-serif"', name: 'Brush Script MT'},
              {id: 'Comic Sans MS, cursive, sans-serif', name: 'Comic Sans MS'},
              {id: 'Courier New, Courier, monospace', name: 'Courier New'},
              {id: 'Georgia, serif', name: 'Georgia'},
              {id: 'Helvetica, serif', name: 'Helvetica'},
              {id: 'Impact, Charcoal, sans-serif', name: 'Impact'},
              {id: 'Lucida Sans Unicode, Lucida Grande, sans-serif', name: 'Lucida Sans Unicode'},
              {id: 'Tahoma, Geneva, sans-serif', name: 'Tahoma'},
              {id: 'Times New Roman, Times, serif', name: 'Times New Roman'},
              {id: 'Helvetica, serif', name: 'Helvetica'},
              {id: 'Helvetica, serif', name: 'Helvetica'},
              {id: 'Trebuchet MS, Helvetica, sans-serif', name: 'Trebuchet MS'},
              {id: 'Verdana, Geneva, sans-serif', name: 'Verdana'},
            ],
            changeProp: 1
          },
          {type: 'number', name: 'fontSize', label: 'Font Size', changeProp: 1},
          {type: 'color', name: 'fontColor', label: 'Font Color', changeProp: 1},
          {
            type: 'select',
            name: 'textTransform',
            label: 'Text Transform',
            options: [{id: 'capitalize', name: 'Aa'}, {id: 'uppercase', name: 'AA'}, {id: 'lowercase', name: 'aa'}],
            changeProp: 1
          },
        ],
      },
      init() {
        this.on('change:attributes', this.handleAttrChange)
        this.on('change:topMargin', this.updateTopMargin)
        this.on('change:listType', this.updateListType)
        this.on('change:fontFamily', this.updateFontFamily)
        this.on('change:fontSize', this.updateFontSize)
        this.on('change:fontColor', this.updateFontColor)
        this.on('change:textTransform', this.updateTextTransform)
      },
      handleAttrChange() {
        console.log('Attributes updated:', this, this.getAttributes())
      },
      updateTopMargin() {
        let modelComponent = editor.getSelected()
        let value = this.props().topMargin
        modelComponent.setStyle({'margin-top': `${value}px`})
        console.log('Top margin chagned:', this.props, modelComponent, value)
      },
      updateListType() {
        let modelComponent = editor.getSelected()
        let value = this.props().listType
        if (value === 'ol') {
          modelComponent.set('tagName', 'ol')
        } else if (value === 'ul') {
          modelComponent.set('tagName', 'ul')
        }
        console.log('List type changed', this.props, modelComponent, value)
      },
      updateFontFamily() {
        let modelComponent = editor.getSelected()
        let value = this.props().fontFamily
        modelComponent.setStyle({'font-family': value})
        console.log('Font family changed:', this.props, modelComponent, value)
      },
      updateFontSize() {
        let modelComponent = editor.getSelected()
        let li = modelComponent.find('li')
        let value = this.props().fontSize
        li.forEach(el => el.setStyle({'font-size': `${value}px`}))
        console.log('Font size changed', this.props, modelComponent, li, value)
      },
      updateFontColor() {
        let modelComponent = editor.getSelected()
        let li = modelComponent.find('li')
        let value = this.props().fontColor
        li.forEach(el => el.setStyle({color: value}))
        console.log('Font color changed', this.props, modelComponent, li, value)
      },
      updateTextTransform() {
        let modelComponent = editor.getSelected()
        let li = modelComponent.find('li')
        let value = this.props().textTransform
        li.forEach(el => el.setStyle({'text-transform': value}))
        console.log('Text transform changed', this.props, modelComponent, li, value)
      },
    },
  })

  domc.addType('divider', {
    isComponent: el => el.tagName === 'hr',
    model: {
      defaults: {
        tagName: 'hr',
        attributes: {
          class: 'mt-5 mb-5',
          'data-gjs-type': 'divider',
        },
        traits: [
          {type: 'number', name: 'margin', label: 'MARGIN'},
          {type: 'number', name: 'dividerWidth', label: 'DIVIDER WIDTH'},
          {type: 'number', name: 'dividerHeight', label: 'DIVIDER HEIGHT'},
          {type: 'color', name: 'dividerColor', label: 'DIVIDER COLOR'},
          {type: 'select', name: 'lineType', label: 'LINE TYPE', options: ['Solid', 'Dashed']},
        ],
        stylable: false,
      },
      init() {
        this.on('change:attributes:margin', this.updateMargin)
        this.on('change:attributes:dividerWidth', this.updateWidth)
        this.on('change:attributes:dividerHeight', this.updateHeight)
        this.on('change:attributes:dividerColor', this.updateColor)
        this.on('change:attributes:lineType', this.updateLineType)
      },
      updateMargin() {
        let modelComponent = editor.getSelected()
        let value = this.getAttributes().margin
        modelComponent.setStyle({margin: `${value}px`})
      },
      updateWidth() {
        let modelComponent = editor.getSelected()
        let value = this.getAttributes().dividerWidth
        modelComponent.setStyle({width: `${value}px`})
      },
      updateHeight() {
        let modelComponent = editor.getSelected()
        let value = this.getAttributes().dividerHeight
        modelComponent.setStyle({'border-width': `${value}px`})
      },
      updateColor() {
        let modelComponent = editor.getSelected()
        let value = this.getAttributes().dividerColor
        modelComponent.setStyle({'border-color': `${value}`})
      },
      updateLineType() {
        let modelComponent = editor.getSelected()
        let value = this.getAttributes().lineType
        modelComponent.setStyle({'border-style': `${value}`})
      },
    },
  })

  domc.addType('button', {
    // isComponent: el => {
    //   console.log('Button element:', el)
    // },
    model: {
      defaults: {
        components: {
          attributes: {
            'data-gjs-type': 'button',
          },
          tagName: 'div',
          style: {
            'font-size': '24px',
            'font-align': 'center',
            border: '1px solid rgba(0,0,0,.2)',
            'border-radius': '3px',
            padding: '10px 25px 5px',
            margin: '20px auto',
            'background-color': '#333',
            'border-color': '#333',
            'box-sizing': 'border-box',
            'text-align': 'center',
          },
          highlightable: false,
          selectable: false,
          badgable: false,
          hoverable: false,
          components: {
            tagName: 'div',
            style: {
              'border-radius': '4px',
              position: 'relative',
            },
            layerable: false,
            highlightable: false,
            selectable: false,
            badgable: false,
            hoverable: false,
            components: {
              type: 'link',
              content: 'Join Today!',
              style: {
                color: '#fff',
              },
              layerable: false,
              highlightable: false,
              selectable: false,
              badgable: false,
              hoverable: false,
            },
          },
        },
        // Set "changeProp: 1" to change the trait to a prop.  This is best if the value is a style.
        // Otherwise traits are added to the html opening tag like this <input  value="">
        traits: [
          {type: 'number', name: 'topMargin', label: 'Top Margin'},
          {type: 'text', name: 'buttonText'},
          {
            type: 'select',
            name: 'fontFamily',
            label: 'Font Family',
            options: [
              {id: 'Arial, Helvetica, sans-serif"', name: 'Arial'},
              {id: 'Arial Black, Gadget, sans-serif', name: 'Arial Black'},
              {id: 'Brush Script MT, sans-serif"', name: 'Brush Script MT'},
              {id: 'Comic Sans MS, cursive, sans-serif', name: 'Comic Sans MS'},
              {id: 'Courier New, Courier, monospace', name: 'Courier New'},
              {id: 'Georgia, serif', name: 'Georgia'},
              {id: 'Helvetica, serif', name: 'Helvetica'},
              {id: 'Impact, Charcoal, sans-serif', name: 'Impact'},
              {id: 'Lucida Sans Unicode, Lucida Grande, sans-serif', name: 'Lucida Sans Unicode'},
              {id: 'Tahoma, Geneva, sans-serif', name: 'Tahoma'},
              {id: 'Times New Roman, Times, serif', name: 'Times New Roman'},
              {id: 'Helvetica, serif', name: 'Helvetica'},
              {id: 'Helvetica, serif', name: 'Helvetica'},
              {id: 'Trebuchet MS, Helvetica, sans-serif', name: 'Trebuchet MS'},
              {id: 'Verdana, Geneva, sans-serif', name: 'Verdana'},
            ],
          },
          {type: 'number', name: 'fontSize', label: 'Font Size'},
          {type: 'color', name: 'fontColor', label: 'Font Color'},
          {
            type: 'select',
            name: 'textTransform',
            label: 'Text Transform',
            options: [{id: 'capitalize', name: 'Aa'}, {id: 'uppercase', name: 'AA'}, {id: 'lowercase', name: 'aa'}],
          },
          {type: 'color', name: 'buttonColor', label: 'Button Color'},
          {type: 'number', name: 'buttonWidth', label: 'Button width'},
          {type: 'number', name: 'borderSize', label: 'Border Size'},
          {type: 'color', name: 'borderColor', label: 'Border Color'},
          {type: 'number', name: 'paddingTop', label: 'Padding Top'},
          {type: 'number', name: 'paddingBottom', label: 'Padding Bottom'},
          {type: 'number', name: 'paddingLeftRight', label: 'Padding Left/Right'},
        ],
        dropable: false,
        stylable: false,
      },
      init() {
        this.on('change:attributes', this.handleAttrChange)
        this.on('change:attributes:topMargin', this.updateTopMargin)
        this.on('change:attributes:buttonText', this.updateButtonText)
        this.on('change:attributes:fontFamily', this.updateFontFamily)
        this.on('change:attributes:fontSize', this.updateFontSize)
        this.on('change:attributes:fontColor', this.updateFontColor)
        this.on('change:attributes:textTransform', this.updateTextTransform)
        this.on('change:attributes:buttonColor', this.updateBtnColor)
        this.on('change:attributes:buttonWidth', this.updateBtnWidth)
        this.on('change:attributes:borderSize', this.updateBorderSize)
        this.on('change:attributes:borderColor', this.updateBorderColor)
        this.on('change:attributes:paddingTop', this.updatePaddingTop)
        this.on('change:attributes:paddingBottom', this.updatePaddingBottom)
        this.on('change:attributes:paddingLeftRight', this.updatePaddingLeftRight)
      },
      // We may be able to create a factory function to reuse, just not sure where to pass the selected component or attribute value yet.
      handleAttrChange() {
        console.log('Attributes updated:', this.getAttributes())
      },
      updateButtonText() {
        let modelComponent = editor.getSelected()
        let link = modelComponent.findType('link')
        let buttonText = this.getAttributes().buttonText
        link[0].set({content: buttonText})
      },
      updateTopMargin() {
        let modelComponent = editor.getSelected()
        let value = this.getAttributes().topMargin
        modelComponent.setStyle({'margin-top': `${value}px`})
      },
      updateFontFamily() {
        let modelComponent = editor.getSelected()
        let value = this.getAttributes().fontFamily
        console.log('Font Changed', value)
        modelComponent.setStyle({'font-family': value})
      },
      //TODO: SOmething weird is happening with font size.  It changes the color of the link too.
      updateFontSize() {
        let modelComponent = editor.getSelected()
        let link = modelComponent.findType('link')
        let value = this.getAttributes().fontSize
        link[0].setStyle({'font-size': `${value}px`})
      },
      updateFontColor() {
        let modelComponent = editor.getSelected()
        let link = modelComponent.findType('link')
        let value = this.getAttributes().fontColor
        link[0].setStyle({'color': `${value}`})
      },
      updateTextTransform() {
        let modelComponent = editor.getSelected()
        let link = modelComponent.findType('link')
        let value = this.getAttributes().textTransform
        link[0].setStyle({'text-transform': `${value}`})
      },
      updateBtnColor() {
        let modelComponent = editor.getSelected()
        let div = modelComponent.find('div')
        let value = this.getAttributes().buttonColor
        div.forEach(el => el.setStyle({'background-color': `${value}`}))
      },
      updateBtnWidth() {
        let modelComponent = editor.getSelected()
        let div = modelComponent.find('div')
        let value = this.getAttributes().buttonWidth
        div[0].setStyle({width: `${value}px`})
      },
      updateBorderSize() {
        let modelComponent = editor.getSelected()
        let div = modelComponent.find('div')
        let value = this.getAttributes().borderSize
        div[0].setStyle({border: `${value}px solid`})
        console.log('Border size:', modelComponent, div, value)
      },
      updateBorderColor() {
        let modelComponent = editor.getSelected()
        let div = modelComponent.find('div')
        let value = this.getAttributes().borderColor
        div[0].setStyle({'border-color': `${value}`})
        console.log('Border color:', modelComponent, div, value)
      },
      updatePaddingTop() {
        let modelComponent = editor.getSelected()
        let div = modelComponent.find('div')
        let value = this.getAttributes().paddingTop
        div[0].setStyle({'padding-top': `${value}px`})
        console.log('Border color:', modelComponent, div, value)
      },
      updatePaddingBottom() {
        let modelComponent = editor.getSelected()
        let div = modelComponent.find('div')
        let value = this.getAttributes().paddingBottom
        div[0].setStyle({'padding-bottom': `${value}px`})
        console.log('Border color:', modelComponent, div, value)
      },
      updatePaddingLeftRight() {
        let modelComponent = editor.getSelected()
        let div = modelComponent.find('div')
        let value = this.getAttributes().paddingLeftRight
        div[0].setStyle({'padding-left': `${value}`, 'padding-right': `${value}px`})
        console.log('Border color:', modelComponent, div, value)
      },
    },
  })

};
