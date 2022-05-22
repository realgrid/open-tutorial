/// <reference types="node" />
/** 
* RealReport v1.1.4
* commit 2468f17

* Copyright (C) 2013-2022 WooriTech Inc.
	https://real-report.com
* All Rights Reserved.
*/

declare const enum Cursor {
    DEFAULT = "default",
    AUTO = "auto",
    POINTER = "pointer",
    WAIT = "wait",
    MOVE = "move",
    COL_RESIZE = "col-resize",
    ROW_RESIZE = "row-resize",
    CROSSHAIR = "crosshair",
    HORZ_RESIZE = "ew-resize",
    VERT_RESIZE = "ns-resize",
    NESW_RESIZE = "nesw-resize",
    NWSE_RESIZE = "nwse-resize",
    NO_DROP = "no-drop",
    NOT_ALLOWED = "not-allowed"
}
declare enum Align {
    LEFT = "left",
    CENTER = "center",
    RIGHT = "right"
}
declare enum VerticalAlign {
    TOP = "top",
    MIDDLE = "middle",
    BOTTOM = "bottom"
}
declare enum PrintUnit {
    PIXEL = "px",
    POINT = "pt",
    INCH = "in",
    CENTCH = "cm",
    MILLI = "mm"
}
declare type ValueString = string | number;
declare type Styles = {
    [key: string]: string;
};
/**
 * 상수로 다룬다.
 */
declare class Dimension {
    static HTMLDPI: number;
    static create(str: any): Dimension;
    static createDimensions(str: string): Dimension[];
    static equals(d1: Dimension, d2: Dimension): boolean;
    private _unit;
    private _value;
    private _fixed;
    constructor(value: ValueString);
    get fixed(): boolean;
    get unit(): PrintUnit;
    get value(): number;
    clone(): Dimension;
    equals(other: any): boolean;
    toString(): string;
    getValue(): any;
    getPixel(domain: number): number;
    getFixedPixel(): number;
    $_getPixel(): number;
}
/**
 * 상수로 다룬다.
 */
declare class DimensionCollection {
    static readonly Empty: DimensionCollection;
    private _dims;
    private _values;
    private _relative;
    private _fixed;
    private _dirty;
    constructor(str: string);
    get count(): number;
    get relative(): boolean;
    get(index: number): Dimension;
    set(index: number, dim: Dimension): void;
    /**
     * '%' 이면 domain에서 fixed 크기들을 제외한 크기에 대한 상대 크기.
     * '%'의 전체 함이 100을 넘으면 100으로 scaling한다.
     * 절대크기는 그 크기대로.
     * NaN이거나 설정하지 않은 크기는 위의 크기들을 제외한 나머지 크기의 균등분으로
     * 최소 min으로 설정된다.
     * 전체 합이 domain보다 크거나 작을 수 있다.
     */
    getSizes(count: number, domain: number, minSize: Dimension, truncate?: boolean): number[];
    getSize(index: number, domain: number): number;
    changeSize(count: number, index: number, delta: number, domain: number, minWidth: Dimension): void;
    private $_refresh;
    private $_init;
}
declare enum PageBreakMode {
    NONE = "none",
    BEFORE = "before",
    AFTER = "after",
    BOTH = "both"
}
declare enum ResizeDirection {
    LEFT = "left",
    RIGHT = "right",
    TOP = "top",
    BOTTOM = "bottom",
    TOP_LEFT = "topLeft",
    BOTTOM_RIGHT = "bottomRight",
    TOP_RIGHT = "topRight",
    BOTTOM_LEFT = "bottomLeft"
}
declare namespace ResizeDirection {
    function isLeft(dir: ResizeDirection): boolean;
    function isTop(dir: ResizeDirection): boolean;
    function isEdge(dir: ResizeDirection): boolean;
    function isIn(dir: ResizeDirection, ...dirs: ResizeDirection[]): boolean;
}
/**
 * Find options
 */
interface FindOptions {
    caseSensitive?: boolean;
    wholeWord?: boolean;
    regularExpression?: boolean;
    inSelection?: boolean;
}

declare type ConfigObject = {
    [key: string]: any;
};
/** @internal */
declare abstract class Base {
    private $_hash;
    private $_disposed;
    private $_disposing;
    constructor();
    dispose(): null;
    protected _doDispose(): void;
    get disposing(): boolean;
    get hash(): number;
    get shash(): string;
    isMe(hash: number): boolean;
    private $_getters;
    /**
     * true를 리턴하면 assign()이 호출되지 않는다.
     */
    protected doAssignSimple(source: any): boolean;
    assignFrom(source: any): void;
    extend(source: ConfigObject): void;
    toProxy(): ConfigObject;
    toString(): string;
}

interface IEventAware {
    addListener(listener: object): IEventAware;
    removeListener(listener: object): IEventAware;
}
/** @internal */
declare class EventAware extends Base implements IEventAware {
    private _listeners;
    constructor();
    protected _doDispose(): void;
    get listenerCount(): number;
    addListener(listener: object): IEventAware;
    removeListener(listener: object): IEventAware;
    isListener(listener: any): boolean;
    clearListener(): void;
    fireEvent(event: string, ...args: any): void;
    fireConfirmEvent(event: string, ...args: any): boolean;
    fireMessageEvent(event: string, ...args: any): string;
    fireObjectEvent(event: string, ...args: any): any;
}

interface IPoint {
    x: number;
    y: number;
}
interface IRect extends IPoint {
    width: number;
    height: number;
}
/** @internal */
declare class Rectangle implements IRect {
    x: number;
    y: number;
    width: number;
    height: number;
    static Temp: Rectangle;
    static create(x: number, y: number, width: number, height: number): Rectangle;
    constructor(x?: number, y?: number, width?: number, height?: number);
    /** left */
    get left(): number;
    set left(value: number);
    /** right */
    get right(): number;
    set right(value: number);
    /** top */
    get top(): number;
    set top(value: number);
    /** bottom */
    get bottom(): number;
    set bottom(value: number);
    /** isEmpty */
    get isEmpty(): boolean;
    clone(): Rectangle;
    getInner(): Rectangle;
    equals(r: Rectangle): boolean;
    leftBy(delta: number): Rectangle;
    rightBy(delta: number): Rectangle;
    topBy(delta: number): Rectangle;
    bottomBy(delta: number): Rectangle;
    shrink(dx: number, dy: number): Rectangle;
    expand(dx: number, dy: number): Rectangle;
    contains(x: number, y: number): boolean;
    setEmpty(): Rectangle;
    move(x?: number, y?: number): Rectangle;
    set(x: number, y: number, width: number, height: number): Rectangle;
    setWidth(value: number): Rectangle;
    copy(r: Rectangle): Rectangle;
    copyHorz(r: Rectangle): Rectangle;
    copyVert(r: Rectangle): Rectangle;
    inflate(left?: number, top?: number, right?: number, bottom?: number): Rectangle;
    translate(dx: number, dy: number): Rectangle;
    round(): Rectangle;
    union(r: Rectangle): Rectangle;
    normalize(): Rectangle;
    intersects(r: Rectangle): boolean;
    toString(): string;
}

/** @internal */
declare class Point {
    x: number;
    y: number;
    static empty(): Point;
    static create(x?: number, y?: number): Point;
    constructor(x?: number, y?: number);
    /** isEmpty */
    get isEmpty(): boolean;
    clone(): Point;
    equals(sz: Point): boolean;
    setEmpty(): Point;
    set(x: number, y: number): Point;
    round(): Point;
    toString(): string;
}

/** @internal */
interface UIToolOwner {
}
/** @internal */
declare class UITool extends Base {
    private _owner;
    private _name;
    private _previous;
    private _dragTracker;
    private _clickX;
    private _clickY;
    private _pointerX;
    private _pointerY;
    private _pointerEventTarget;
    protected _lastTouch: number;
    constructor(owner: UIToolOwner, name: string);
    protected _doDispose(): void;
    /** owner */
    get owner(): UIToolOwner;
    /** name */
    get name(): string;
    /** previous */
    get previous(): UITool;
    /** dragTracker */
    get dragTracker(): UIDragTracker;
    set dragTracker(value: UIDragTracker);
    /** dragging */
    get dragging(): boolean;
    /** pointerX */
    get pointerX(): number;
    /** pointerY */
    get pointerY(): number;
    activate(previous: UITool): void;
    deactivate(): void;
    keyDown(event: KeyboardEvent): boolean;
    keyUp(event: KeyboardEvent): boolean;
    keyPress(event: KeyboardEvent): boolean;
    pointerDown(event: PointerEvent): boolean;
    dragFrom(event: PointerEvent, tracker: UIDragTracker): void;
    dropFrom(event: PointerEvent, tracker: UIDragTracker): void;
    pointerMove(event: PointerEvent): void;
    pointerUp(event: PointerEvent): void;
    pointerEnter(event: PointerEvent): void;
    pointerLeave(event: PointerEvent): void;
    pointerOver(event: PointerEvent): void;
    pointerOutside(): void;
    mouseWheel(event: MouseEvent): boolean;
    contextMenu(event: PointerEvent): boolean;
    click(event: PointerEvent): void;
    dblclick(event: PointerEvent): void;
    setFocus(target?: HTMLElement): void;
    focusLeave(event: Event): void;
    protected get pointerEventTarget(): HTMLElement;
    protected ispointerEventTarget(elt: UIElement): boolean;
    protected _doActivated(previous: UITool): void;
    protected _doDeactivated(): void;
    protected _doKeyDown(event: KeyboardEvent): boolean;
    protected _doKeyUp(event: KeyboardEvent): boolean;
    protected _doKeyPress(event: KeyboardEvent): boolean;
    /**
     * true 리턴하면 preventDefault 호출.
     */
    protected _doPointerDown(event: PointerEvent | TouchEvent): boolean;
    protected _doPointerMove(event: PointerEvent | TouchEvent): void;
    /** 그리드 밖에서도 호출된다. */
    protected _doPointerUp(event: PointerEvent | TouchEvent): void;
    protected _doPointerEnter(event: PointerEvent): void;
    protected _doPointerLeave(event: PointerEvent): void;
    protected _doPointerOver(event: PointerEvent): void;
    protected _doPointerOutside(): void;
    protected _doMouseWheel(event: MouseEvent): boolean;
    protected _doContextMenu(event: PointerEvent): boolean;
    /** 그리드 밖에서 마우스를 놓으면 호출되지 않는다. */
    protected _doClick(event: PointerEvent): void;
    protected _doDblClick(event: PointerEvent): void;
    protected _doSetFocus(target?: HTMLElement): void;
    protected _doFocusLeave(event: Event): void;
    protected _getUIDragTracker(request: UIEditRequest, x: number, y: number): UIDragTracker;
    protected _startDragTracker(event: PointerEvent, x: number, y: number, shift: boolean, alt: boolean): void;
    protected _stopDragTracker(event: PointerEvent, x: number, y: number, canceled: boolean): void;
    protected _doDragTrackerStarted(UIDragTracker: UIDragTracker): void;
    protected _doDragTrackerFinished(UIDragTracker: UIDragTracker, canceled: boolean): void;
}
/** @internal */
declare abstract class UIEditRequest extends Base {
    constructor();
    /** cursor */
    get cursor(): Cursor;
    /** source */
    get source(): any;
    /** selectable */
    get selectable(): boolean;
    /** dblClickable */
    get dblClickable(): boolean;
}
/** @internal */
declare class UIDragTracker extends Base {
    private _container;
    private _name;
    private _active;
    private _completed;
    private _dragging;
    private _startX;
    private _startY;
    private _currentX;
    private _currentY;
    constructor(container: UIContainer, name: string);
    /** container */
    get container(): UIContainer;
    /** name */
    get name(): string;
    /** active */
    get active(): boolean;
    /** dragging */
    get dragging(): boolean;
    /** startWhenCreated */
    get startWhenCreated(): boolean;
    /** completed */
    get completed(): boolean;
    /**
     * linkable proprerty.
     * 다른 그리드에서 진행 가능한 tracker.
     */
    get linkable(): boolean;
    activate(): void;
    deactivate(): void;
    start(event: PointerEvent, eventTarget: HTMLElement, x: number, y: number, shift: boolean, alt: boolean): boolean;
    drag(eventTarget: HTMLElement, x: number, y: number): boolean;
    cancel(event: PointerEvent): void;
    drop(event: PointerEvent, eventTarget: HTMLElement, x: number, y: number): void;
    getRequest(): UIEditRequest;
    getNextRequest(x: number, y: number): UIEditRequest;
    protected get startX(): number;
    protected get startY(): number;
    protected get currentX(): number;
    protected get currentY(): number;
    protected _showFeedback(x: number, y: number): void;
    protected _moveFeedback(x: number, y: number): void;
    protected _hideFeedback(): void;
    protected _doActivate(): void;
    protected _doDeactivate(): void;
    protected _doStart(event: PointerEvent, eventTarget: HTMLElement, x: number, y: number, shfit: boolean, alt: boolean): boolean;
    protected _doDrag(eventTarget: HTMLElement, x: number, y: number): boolean;
    protected _doCanceled(x: number, y: number): void;
    protected _canAccept(eventTarget: HTMLElement, x: number, y: number): boolean;
    protected _doCompleted(eventTarget: HTMLElement, x: number, y: number): void;
    protected _doEnded(event: PointerEvent): void;
}

declare class UIElement extends EventAware {
    userData: any;
    private _parent;
    private _dom;
    private _elements;
    constructor(doc: Document, className: string, elementType?: string);
    get dom(): HTMLElement;
    /** parent */
    get parent(): UIElement;
    /** container */
    get container(): UIContainer;
    /** x */
    get x(): number;
    set x(value: number);
    /** y */
    get y(): number;
    set y(value: number);
    /** width */
    get width(): number;
    /** height */
    get height(): number;
    isDom(dom: Element): boolean;
    setClassName(className: string): void;
    setHint(title: string): void;
    setStyle(style: string, value: string): void;
    clearStyle(style: string): void;
    setStyles(styles: object): void;
    setImportantStyle(style: string, value: any): void;
    getBounds(): IRect;
    setBounds(x: number, y: number, width: number, height: number): void;
    setRect(r: IRect): void;
    move(x: number, y: number): UIElement;
    setXP(x: number): void;
    setYP(y: number): void;
    clear(): void;
    addChild(child: UIElement): boolean;
    removeChild(child: UIElement): boolean;
    removeLast(): UIElement;
    containerToLocal(x?: number, y?: number): {
        x: number;
        y: number;
    };
    setText(text: string): void;
    hide(): void;
    show(style?: string): void;
    protected _addChild(child: UIElement): void;
    protected _removeChild(child: UIElement): boolean;
    protected _prepareDom(doc: Document, dom: HTMLElement): void;
}
/** @internal */
declare abstract class UIContainer extends EventAware {
    private _activeTool;
    private _containerDiv;
    private _layoutNeeded;
    private _defaultTool;
    private _defaultCursor;
    private _eventHandlers;
    private _eventNodes;
    private _doc;
    private _root;
    private _requestTimer;
    private _containerRender;
    private _saveDisplay;
    constructor(containerId: string | HTMLDivElement);
    protected _doDispose(): void;
    /** Document */
    get doc(): Document;
    /** visible */
    get visible(): boolean;
    set visible(value: boolean);
    /** activeTool */
    get activeTool(): UITool;
    set activeTool(value: UITool);
    /** defaultTool */
    get defaultTool(): UITool;
    /** width */
    get width(): number;
    /** height */
    get height(): number;
    getBound(): Rectangle;
    getHtml(): string;
    setCursor(cursor?: string): void;
    contains(dom: any): boolean;
    protected abstract _getCssSelector(): string;
    private prepareContainer;
    protected _addElement(element: UIElement): void;
    protected _prepareChildren(doc: Document, dom: HTMLElement): void;
    protected _createDefaultTool(): UITool;
    isLayoutNeeded(): boolean;
    invalidateLayout(): void;
    updateNow(): void;
    protected _render(timestamp: number): void;
    private $$_render;
    protected _doLayout(doc: Document, bounds: Rectangle): void;
    protected _doPrepareRender(bounds: Rectangle): void;
    protected _doRenderHtml(bounds: Rectangle): void;
    _registerEventHandlers(container: HTMLElement): void;
    $_addListener(node: any, event: any, handler: any, capture: any): void;
    $_removeListener(node: any, event: any): void;
    $_removeListenerAll(node?: HTMLElement): void;
    private _unloadHandler;
    private _resizeHandler;
    protected _doResized(event: Event): void;
    protected _isEnabled(): boolean;
    private _keyDownHandler;
    private _keyUpHandler;
    private _keyPressHandler;
    eventToContainer(event: any): Point;
    private toOffset;
    private _clickHandler;
    private _dblclickHandler;
    private $_getHtmlElement;
    private _pointerDownHandler;
    private _pointerMoveHandler;
    private _pointerUpHandler;
    private _pointerEnterHandler;
    private _pointerLeaveHandler;
    private _pointerOverHandler;
    private _contextMenuHander;
    private _wheelHandler;
    private _focusHandler;
    private _blurHandler;
    private _selectstartHandler;
    private _focusinHandler;
    private _globalPointerDownHandler;
    private _focusoutHandler;
    private _focusHandlerFireFox;
}

/** @internal */
interface VisualToolOwner {
    findElementAt(x: number, y: number, hitTesting: boolean, blockLayer: boolean): VisualElement;
    findElementOf(dom: HTMLElement): VisualElement;
    getTableCell(dom: HTMLElement): HTMLTableCellElement;
}
/** @internal */
declare class VisualTool extends Base {
    private _owner;
    private _name;
    private _previous;
    private _dragTracker;
    private _clickX;
    private _clickY;
    private _mouseX;
    private _mouseY;
    private _mouseEventTarget;
    protected _lastTouch: number;
    constructor(owner: VisualToolOwner, name: string);
    protected _doDispose(): void;
    /** owner */
    get owner(): VisualToolOwner;
    /** name */
    get name(): string;
    /** previous */
    get previous(): VisualTool;
    /** dragTracker */
    get dragTracker(): DragTracker;
    set dragTracker(value: DragTracker);
    /** dragging */
    get dragging(): boolean;
    /** mouseX */
    get mouseX(): number;
    /** mouseY */
    get mouseY(): number;
    get mouseEventTarget(): HTMLElement;
    findElementAt(x: number, y: number, hitTesting: boolean, blockLayer?: boolean): VisualElement;
    findElementOf(dom: HTMLElement): VisualElement;
    activate(previous: VisualTool): void;
    deactivate(): void;
    keyDown(event: KeyboardEvent): boolean;
    keyUp(event: KeyboardEvent): boolean;
    keyPress(event: KeyboardEvent): boolean;
    mouseDown(event: MouseEvent | TouchEvent): boolean;
    dragFrom(event: MouseEvent, tracker: DragTracker): void;
    dropFrom(event: MouseEvent, tracker: DragTracker): void;
    mouseMove(event: MouseEvent | TouchEvent): void;
    mouseUp(event: MouseEvent | TouchEvent): void;
    mouseEnter(event: MouseEvent): void;
    mouseLeave(event: MouseEvent): void;
    mouseOver(event: MouseEvent): void;
    mouseOutside(): void;
    mouseWheel(event: MouseEvent): boolean;
    contextMenu(event: MouseEvent): boolean;
    click(event: MouseEvent): void;
    dblclick(event: MouseEvent): void;
    setFocus(target?: HTMLElement): void;
    focusLeave(event: Event): void;
    protected isMouseEventTarget(elt: VisualElement): boolean;
    protected _doActivated(previous: VisualTool): void;
    protected _doDeactivated(): void;
    protected _doKeyDown(event: KeyboardEvent): boolean;
    protected _doKeyUp(event: KeyboardEvent): boolean;
    protected _doKeyPress(event: KeyboardEvent): boolean;
    /**
     * true 리턴하면 preventDefault 호출.
     */
    protected _doMouseDown(event: MouseEvent | TouchEvent): boolean;
    protected _doMouseMove(event: MouseEvent | TouchEvent): void;
    /** 그리드 밖에서도 호출된다. */
    protected _doMouseUp(event: MouseEvent | TouchEvent): void;
    protected _doMouseEnter(event: MouseEvent): void;
    protected _doMouseLeave(event: MouseEvent): void;
    protected _doMouseOver(event: MouseEvent): void;
    protected _doMouseOutside(): void;
    protected _doMouseWheel(event: MouseEvent): boolean;
    protected _doContextMenu(event: MouseEvent): boolean;
    /** 그리드 밖에서 마우스를 놓으면 호출되지 않는다. */
    protected _doClick(event: MouseEvent): void;
    protected _doDblClick(event: MouseEvent): void;
    protected _doSetFocus(target?: HTMLElement): void;
    protected _doFocusLeave(event: Event): void;
    protected _getDragTracker(request: EditRequest, x: number, y: number): DragTracker;
    protected _startDragTracker(x: number, y: number, shift: boolean, alt: boolean): void;
    protected _stopDragTracker(x: number, y: number, canceled: boolean): void;
    protected _doDragTrackerStarted(dragTracker: DragTracker): void;
    protected _doDragTrackerFinished(dragTracker: DragTracker, canceled: boolean): void;
    protected _findTableCell(source?: HTMLElement): HTMLTableCellElement;
    protected _doTouchStart(event: TouchEvent): void;
    protected _doTouchMove(event: TouchEvent): void;
    protected _doTouchEnd(evnet: TouchEvent): void;
    protected _doTouchCancel(evnet: TouchEvent): void;
}
/** @internal */
declare abstract class EditRequest extends Base {
    constructor();
    /** cursor */
    get cursor(): Cursor;
    /** source */
    get source(): any;
    /** selectable */
    get selectable(): boolean;
    /** dblClickable */
    get dblClickable(): boolean;
}
/** @internal */
declare class DragTracker extends Base {
    private _container;
    private _name;
    private _active;
    private _completed;
    private _dragging;
    private _startX;
    private _startY;
    private _currentX;
    private _currentY;
    constructor(container: VisualContainer, name: string);
    /** container */
    get container(): VisualContainer;
    /** name */
    get name(): string;
    /** active */
    get active(): boolean;
    /** dragging */
    get dragging(): boolean;
    /** startWhenCreated */
    get startWhenCreated(): boolean;
    /** completed */
    get completed(): boolean;
    /**
     * linkable proprerty.
     * 다른 그리드에서 진행 가능한 tracker.
     */
    get linkable(): boolean;
    get cursor(): string;
    activate(): void;
    deactivate(): void;
    start(eventTarget: HTMLElement, x: number, y: number, shift: boolean, alt: boolean): boolean;
    drag(eventTarget: HTMLElement, x: number, y: number): boolean;
    cancel(): void;
    drop(eventTarget: HTMLElement, x: number, y: number): void;
    end(): void;
    getRequest(): EditRequest;
    getNextRequest(x: number, y: number): EditRequest;
    protected get startX(): number;
    protected get startY(): number;
    protected get currentX(): number;
    protected get currentY(): number;
    protected _showFeedback(x: number, y: number): void;
    protected _moveFeedback(x: number, y: number): void;
    protected _hideFeedback(): void;
    protected _doActivate(): void;
    protected _doDeactivate(): void;
    protected _doStart(eventTarget: HTMLElement, x: number, y: number, shfit: boolean, alt: boolean): boolean;
    protected _doDrag(eventTarget: HTMLElement, x: number, y: number): boolean;
    protected _doCanceled(x: number, y: number): void;
    protected _canAccept(eventTarget: HTMLElement, x: number, y: number): boolean;
    protected _doCompleted(eventTarget: HTMLElement, x: number, y: number): void;
    protected _doEnded(): void;
}

/** @internal */
declare abstract class VisualContainer extends EventAware implements VisualToolOwner {
    static readonly FEEDBACK_ZINDEX = 1000;
    private static $_Containers;
    static $_mouseContainer: number;
    getMouseContainer(): VisualContainer;
    private static $_ActiveGrid;
    static getActiveGrid(): any;
    static setActiveGrid(hash: number): void;
    static clearContainer(hash: number): void;
    static disposeStatic(): void;
    private _disabled;
    private _activeTool;
    private _containerDiv;
    private _containerDom;
    private _measurer;
    private _textMeasurer;
    private _checkMeasurer;
    private _checkRect;
    private _updateRequested;
    private _layoutNeeded;
    private _invalidated;
    private _scrolling;
    private _defaultTool;
    private _captured;
    private _focusing;
    private _focusingTarget;
    private _hovered;
    private _currentX;
    private _currentY;
    private _rendered;
    private _defaultCursor;
    private _drawing;
    private _offsetX;
    private _offsetY;
    private _rootElement;
    private _feedbackElement;
    private _printRoot;
    private _eventHandlers;
    private _eventNodes;
    private _contextMenu;
    private _containerRender;
    private _scrollTool;
    private _cursor;
    private _testWidth;
    private _testHeight;
    private _requestTimer;
    private _doc;
    private _saveDisplay;
    private $_testing;
    constructor(containerId: string | HTMLDivElement);
    protected _doDispose(): void;
    /** document */
    get doc(): Document;
    /** dom */
    get dom(): HTMLElement;
    /** visible */
    get visible(): boolean;
    set visible(value: boolean);
    /** disabled */
    get disabled(): boolean;
    set disabled(value: boolean);
    /** printing */
    get printing(): boolean;
    /** activeTool */
    get activeTool(): VisualTool;
    set activeTool(value: VisualTool);
    /** defaultTool */
    get defaultTool(): VisualTool;
    /** measurer */
    protected get measurer(): HTMLElement;
    /** width */
    get width(): number;
    /** height */
    get height(): number;
    get scrollHeight(): number;
    get scrollTop(): number;
    protected get scrolling(): boolean;
    findElementAt(x: number, y: number, hitTesting: boolean, blockLayer: boolean): VisualElement;
    findElementOf(dom: Element): VisualElement;
    getTableCell(dom: HTMLElement): HTMLTableCellElement;
    setCursor(cursor: string): void;
    setFocus(): void;
    updateNow(): void;
    toScreen(r: Rectangle): Rectangle;
    pointToScreen(x: number, y: number): {
        x: number;
        y: number;
    };
    getBound(): Rectangle;
    getHtml(): string;
    addElement(element: VisualElement): boolean;
    removeElement(element: VisualElement): boolean;
    addFeedback(element: UIElement): boolean;
    addFeedbacks(...elements: UIElement[]): void;
    removeFeedback(element: UIElement): boolean;
    removeFeedbacks(...elements: UIElement[]): void;
    resetSize(callback?: any): void;
    measureText(style: string, text: string): number;
    private $_refreshCheckMeasurer;
    measureCheckWidth(): number;
    measureCheckHeight(): number;
    contains(target: any): boolean;
    getDomPosition(elt: HTMLElement | VisualElement, container?: HTMLDivElement): IRect;
    private $_offsetDomPosition;
    getBoundingRect(element: VisualElement, zoom?: number): Rectangle;
    private $_setTesting;
    protected get _isTesting(): boolean;
    protected _doDisabledChanged(): void;
    private $_prepareContainer;
    protected _doPrepareContainer(dom: HTMLElement): void;
    protected _createRootElement(doc: Document): VisualElement;
    protected _createDefaultTool(): VisualTool;
    isLayoutNeeded(): boolean;
    invalidateLayout(scrolling?: boolean): void;
    invalidate(force: boolean): void;
    invalidateElement(element: VisualElement): void;
    invalidateElements(force?: boolean): void;
    refresh(): void;
    protected _render(timestamp: number): void;
    private $$_render;
    protected _layoutChildren(bounds: Rectangle): void;
    protected _doLayout(bounds: Rectangle): void;
    protected _doAfterRender(): void;
    protected _doPrepareRender(bounds: Rectangle): void;
    protected _doRenderHtml(bounds: Rectangle): void;
    protected _doDrawContainer(bounds: Rectangle): void;
    protected _drawElement(element: VisualElement): void;
    private _validateChildren;
    _registerEventHandlers(container: HTMLElement): void;
    $_addListener(node: any, event: any, handler: any, capture: any): void;
    $_removeListener(node: any, event: any): void;
    $_removeListenerAll(node?: HTMLElement): void;
    private _unloadHandler;
    private _resizeHandler;
    protected _doResized(event: Event): void;
    protected _isEnabled(): boolean;
    private _keyDownHandler;
    private _keyUpHandler;
    private _keyPressHandler;
    eventToContainer(event: any): Point;
    private toOffset;
    private toOffsetTouch;
    private _clickHandler;
    private _dblclickHandler;
    private $_getHtmlElement;
    protected _isAutoFocus(): boolean;
    private _mouseDownHandler;
    private _mouseMoveHandler;
    private _mouseUpHandler;
    private _mouseEnterHandler;
    private _mouseLeaveHandler;
    private _mouseOverHandler;
    private _contextMenuHander;
    private _wheelHandler;
    private _focusHandler;
    private _blurHandler;
    private _selectstartHandler;
    private _focusinHandler;
    private _globalMouseDownHandler;
    private _focusoutHandler;
    private _focusHandlerFireFox;
}

declare type VisualElementCallback = (element: VisualElement, dom: HTMLElement) => void;
/** @internal */
declare abstract class VisualElement extends EventAware {
    private static readonly Testing;
    private _positionable;
    private _x;
    private _y;
    private _width;
    private _height;
    private _visible;
    private _styleName;
    private _name;
    private _parent;
    private _elements;
    private _dom;
    private _dirty;
    private _hovered;
    private _className;
    private _nodraw;
    constructor(doc: Document, name?: string, callback?: VisualElementCallback);
    protected _doDispose(): void;
    /** positionable */
    get positionable(): boolean;
    set positionable(value: boolean);
    /** name */
    get name(): string;
    /** styleName */
    get styleName(): string;
    set styleName(value: string);
    /** container */
    get container(): VisualContainer;
    /** parent */
    get parent(): VisualElement;
    /** elements */
    get elements(): VisualElement[];
    /** childCount */
    get childCount(): number;
    /** isSingleton */
    get isSingleton(): boolean;
    /** x */
    get x(): number;
    set x(value: number);
    /** y */
    get y(): number;
    set y(value: number);
    /** width */
    get width(): number;
    set width(value: number);
    /** height */
    get height(): number;
    set height(value: number);
    /** right */
    get right(): number;
    /** bottom */
    get bottom(): number;
    /** position */
    get position(): Point;
    /** bounds */
    get bounds(): Rectangle;
    /** clientRect */
    get clientRect(): Rectangle;
    /** visible */
    get visible(): boolean;
    set visible(value: boolean);
    /** findable */
    get findable(): boolean;
    /** hovered */
    get hovered(): boolean;
    set hovered(value: boolean);
    /** isLayer */
    get isLayer(): boolean;
    /**
     * blockable
     * true이면 isLayer일 때도 findElementAt에서 hit test될 수 있다.
     */
    get blockable(): boolean;
    /** mouseX */
    get mouseX(): number;
    /** mouseY */
    get mouseY(): number;
    /** dom */
    get dom(): HTMLElement;
    /** doc */
    get doc(): Document;
    /** style */
    protected get style(): CSSStyleDeclaration;
    /** offsetWidth */
    get offsetWidth(): number;
    /** offsetHeight */
    get offsetHeight(): number;
    /** offsetSize */
    get offsetSize(): {
        width: number;
        height: number;
    };
    get printable(): boolean;
    isDom(dom: Element): boolean;
    containsDom(dom: Element): boolean;
    containsClass(className: string): boolean;
    canHover(): boolean;
    getChildren(): VisualElement[];
    getChild(index: number): VisualElement;
    indexOf(element: VisualElement): number;
    get firstChild(): VisualElement;
    contains(element: VisualElement): boolean;
    getAncestor(cls: any): VisualElement;
    addDom(dom: HTMLElement): void;
    addChild(child: VisualElement): boolean;
    protected _getParentDom(): HTMLElement;
    insertChild(index: number, child: VisualElement): boolean;
    removeChild(child: VisualElement): boolean;
    removeChildAt(index: number): VisualElement;
    removeLast(): VisualElement;
    clear(): boolean;
    hideAll(): void;
    invalidate(force?: boolean, invalidateChildren?: boolean): void;
    validate(): void;
    invalidateLayout(): void;
    getBounds(r?: Rectangle): Rectangle;
    getClientRect(r?: Rectangle): Rectangle;
    containsInBounds(x: number, y: number): boolean;
    containsInClient(x: number, y: number): boolean;
    parentToElement(parent: VisualElement, x: number, y: number): Point;
    translateBy(descendant: VisualElement, r?: Rectangle): Rectangle;
    topBy(parent: VisualElement, top: number): number;
    boundsBy(parent: VisualElement, r?: Rectangle): Rectangle;
    boundsByContainer(r?: Rectangle): Rectangle;
    pointByContainer(x: number, y: number): Point;
    containerToElement(x: number, y: number): Point;
    boundsByScreen(r?: Rectangle): Rectangle;
    offsetFrom(elt: VisualElement): Point;
    hitTest(x: number, y: number): boolean;
    findChildAt(x: number, y: number, hitTesting: boolean, blockLayer: boolean): VisualElement;
    findChildOf(dom: Element): VisualElement;
    move(x: number, y: number, draw?: boolean): void;
    resize(width: number, height: number, draw?: boolean): void;
    setBounds(x: number, y: number, width: number, height: number): VisualElement;
    setBoundsI(x: number, y: number, width: number, height: number): VisualElement;
    setRect(r: IRect): VisualElement;
    setRectI(r: IRect): VisualElement;
    getBoundingRect(): any;
    draw(): void;
    drawRecursive(): void;
    resetSizeStyle(): void;
    getHtml(): string;
    setImportantStyle(style: string, value: any): void;
    isAncestorOf(child: VisualElement): boolean;
    isAncestorDomOf(child: HTMLElement, checkThis?: boolean): boolean;
    findDescendantOf(dom: HTMLElement): VisualElement;
    setStyles(styles: any): void;
    get scrollTop(): number;
    get scrollLeft(): number;
    scrollDom(x: number, y: number): void;
    setHint(title: string): void;
    protected _isTesting(): boolean;
    protected _getElements(): VisualElement[];
    protected _createDom(doc: Document): HTMLElement;
    protected _getCssSelector(): string;
    protected _initDom(doc: Document, dom: HTMLElement): void;
    protected _addEventListeners(dom: HTMLElement): void;
    protected _removeEventListeners(dom: HTMLElement): void;
    private $_attached;
    protected _doAttached(parent: VisualElement): void;
    private $_detached;
    protected _doDetached(parent: VisualElement): void;
    protected _isEmptySize(): boolean;
    protected _setSizeStyle(css: CSSStyleDeclaration): void;
    setPrintStyles(): void;
    protected _getCssDisplay(): string;
    resetStyleName(): void;
    protected _setClassName(dom: HTMLElement): void;
    replaceDom(dom: HTMLElement): void;
    cloneNode(): Node;
    applyBounds(): void;
    protected _beforeDraw(dom: HTMLElement): void;
    protected _doDraw(dom: HTMLElement): void;
    protected _afterDraw(dom: HTMLElement): void;
    protected _hoverChanged(): void;
    protected _visibleChanged(): void;
    private sizeChanged;
    protected _doSizeChanged(): void;
}
/** @internal */
declare class LayerElement extends VisualElement {
    get isLayer(): boolean;
    protected _doDraw(element: HTMLElement): void;
}

/**
 */
declare class PageItemContainer extends BoundedContainer {
    static readonly $_ctor: string;
    private _label;
    constructor(name: string, label: string);
    get outlineLabel(): string;
    get isArray(): boolean;
    canResize(dir: ResizeDirection): boolean;
    protected _doLoad(loader: IReportLoader, src: any): void;
    protected _doSave(target: object): void;
}

declare enum BoxItemsAlign {
    START = "start",
    MIDDLE = "middle",
    END = "end"
}
declare abstract class BoxContainer extends ReportGroupItem {
    static readonly PROP_ITEMS_ALIGN = "itemsAlign";
    static readonly PROP_ITEM_GAP = "itemGap";
    static readonly PROP_OVERFLOW = "overflow";
    static readonly PROPINFOS: IPropInfo[];
    static readonly STYLE_PROPS: string[];
    private _itemsAlign;
    private _itemGap;
    private _overflow;
    private _itemGapDim;
    constructor(name: string);
    /**
     */
    get itemsAlign(): BoxItemsAlign;
    set itemsAlign(value: BoxItemsAlign);
    /**
     */
    get itemGap(): string | number;
    set itemGap(value: string | number);
    /**
     * true로 설정되면 자식이 넘칠 수 있다.
     * 특히, table을 자식으로 갖는 경우 true로 설정해야 우측 끝이 표시되는 경우가 있을 수 있다.
     */
    get overflow(): boolean;
    set overflow(value: boolean);
    getItemGap(domain: number): number;
    /**
     * @internal
     * ReportPage에서 bodyItems를 통해 호출한다.
     */
    loadProps(src: any): void;
    protected _getEditProps(): IPropInfo[];
    protected _datable(): boolean;
    protected _getStyleProps(): string[];
    protected _doLoad(loader: IReportLoader, src: any): void;
    protected _doSave(target: object): void;
    canAlign(child: ReportItem): boolean;
    canAdoptDragSource(source: any): boolean;
}
/**
 * 수직으로 자식 item들을 배치한다.
 * Html flex box를 활용한다.
 */
declare class ColumnBoxContainer extends BoxContainer {
    static readonly CHILD_PROPS: IPropInfo[];
    static readonly $_ctor: string;
    static readonly ITEM_TYPE = "Column Box";
    private _child_left;
    private _child_right;
    constructor(name: string);
    /**
     * left
     */
    getLeftOf(item: ReportItem): number | string;
    setLeftOf(item: ReportItem, value: number | string): void;
    /**
     * right
     */
    getRightOf(item: ReportItem): number | string;
    setRightOf(item: ReportItem, value: number | string): void;
    getSaveType(): string;
    get outlineLabel(): string;
    get pathLabel(): string;
    protected _getChildPropInfos(item: ReportItem): IPropInfo[];
    protected _doDefaultInit(loader: IReportLoader, parent: ReportGroupItem, hintWidth: number, hintHeight: number): void;
    protected _doLoadChild(child: ReportItem, src: any): void;
    canAlignTo(item: ReportPageItem, to: string): boolean;
    canResizeChild(item: ReportItem, dir: ResizeDirection): boolean;
}

/**
 * Edit command base.
 * 편집 행위 외에 다른 로직이 포함되지 않도록 한다.
 */
declare abstract class EditCommand extends Base {
    private _name;
    private _id;
    private _time;
    constructor(name: string);
    protected _doDispose(): void;
    /** name */
    get name(): string;
    /** id */
    get id(): number;
    /** time */
    get time(): Date;
    /** displayLabel */
    get displayLabel(): string;
    /** description */
    get description(): string;
    abstract get source(): any;
    abstract undo(): void;
    abstract redo(redoing: boolean): any;
    run(): any;
}
/**
 * Edit command stack owner spec.
 */
interface IEditCommandStackOwner {
    editCommandStackChanged(stack: EditCommandStack, cmd: EditCommand, undoable: boolean, redoable: boolean): void;
    editCommandStackDirtyChanged(stack: EditCommandStack): void;
}
/**
 * Edit command stack.
 * 커맨드는 반드시 이 객체를 통해서 실행되거나 undo 되어야 한다.
 */
declare class EditCommandStack extends EventAware {
    private _owner;
    private _commands;
    private _current;
    private _closed;
    private _undoing;
    private _redoing;
    constructor(owner: IEditCommandStackOwner);
    protected _doDispose(): void;
    /** owner */
    get owner(): IEditCommandStackOwner;
    /** length */
    get length(): number;
    /** current */
    get current(): number;
    /** empty */
    get empty(): boolean;
    /** canUndo */
    get canUndo(): boolean;
    /** canRedo */
    get canRedo(): boolean;
    /** undoing */
    get undoing(): boolean;
    /** redoing */
    get redoing(): boolean;
    /** dirty */
    get dirty(): boolean;
    get(index: number): EditCommand;
    undo(): boolean;
    redo(redoing?: boolean): boolean;
    execute(command: EditCommand): boolean;
    flush(): void;
    /**
     * 현 위치를 marking한다. dirty는 마지막 marking 시점과 다른 경우 true가 된다.
     */
    close(): void;
    getHistory(all?: boolean): EditCommand[];
    protected _changed(oldCurrent: number, cmd: EditCommand): void;
    private $_shrink;
}

/**
 * 리포트 페이지 모델. 하나 이상의 section들로 구성된다.
 *
 * 1. band는 body의 최상위 항목으로만 추가될 수 있다. 즉, 다른 항목의 자식이 될 수 없다.
 */
declare class ReportPage extends ReportGroupItem implements IEventAware {
    static readonly ITEM_ADDED = "onPageItemAdded";
    static readonly ITEMS_ADDED = "onPageItemsAdded";
    static readonly ITEM_REMOVED = "onPageItemRemoved";
    static readonly ITEMS_REMOVED = "onPageItemsRemoved";
    static readonly ITEM_CHANGED = "onPageItemChanged";
    static readonly $_ctor: string;
    private _report;
    private _events;
    private _nameMap;
    private _reportHeader;
    private _reportFooter;
    private _pageHeader;
    private _pageFooter;
    private _body;
    private _backItems;
    private _frontItems;
    private _sections;
    saveTag: string;
    private _loading;
    private _removing;
    constructor(report: Report);
    addListener(listener: object): IEventAware;
    removeListener(listener: object): IEventAware;
    /**
     * report
     */
    get report(): Report;
    /**
     * reportHeader
     */
    get reportHeader(): ReportHeader;
    /**
     * reportFooter
     */
    get reportFooter(): ReportFooter;
    /**
     * pageHeader
     */
    get pageHeader(): PageHeader;
    /**
     * pageFooter
     */
    get pageFooter(): PageFooter;
    /**
     * body
     */
    get body(): PageBody;
    get backContainer(): PageItemContainer;
    /**
     * backItems
     */
    get backItems(): ReportItem[];
    get frontContainer(): PageItemContainer;
    /**
     * frontItems
     */
    get frontItems(): ReportItem[];
    /**
     * loading
     */
    get loading(): boolean;
    getItem(name: string): ReportItem;
    removeItems(commands: EditCommandStack, items: ReportPageItem[]): number;
    search(key: string, options: FindOptions, results: FindResult[]): void;
    get outlineLabel(): string;
    get pathLabel(): string;
    get page(): ReportPage;
    canMove(): boolean;
    getEditProps(): IPropInfo[];
    protected _getStyleProps(): string[];
    canDelete(): boolean;
    protected _doLoad(loader: IReportLoader, src: any): void;
    protected _ignoreItems(): boolean;
    protected _doSave(target: object): void;
    canResize(dir: ResizeDirection): boolean;
    getAllItems(root?: ReportGroupItem, all?: boolean): ReportItem[];
    collectInvalids(report: Report, invalids: {
        item: ReportItem;
        reason: string;
    }[]): void;
    private $_itemAdded;
    private $_addItem;
    private $_itemsAdded;
    private $_itemRemoved;
    private $_removeItem;
    private $_itemsRemoved;
    private $_itemChanged;
    /**
     * ReportItem.name에서 호출한다.
     */
    private $_nameChanged;
    /**
     * Report.onDesignDataManagerNameChanged에서 호출한다.
     */
    private $_dataNameChanged;
    /**
     * Report.onDesignDataManagerFieldNameChanged 호출한다.
     */
    private $_dataFieldNameChanged;
    protected _fireItemAdded(item: ReportPageItem, index: number, silent: boolean): void;
    protected _fireItemsAdded(items: ReportPageItem[], index: number): void;
    protected _fireItemRemoved(item: ReportPageItem, oldParent: ReportGroupItem): void;
    protected _fireItemsRemoved(items: ReportPageItem[]): void;
    protected _fireItemChanged(item: ReportPageItem, prop: string, value: any, oldValue: any): void;
}
/**
 * Report header/footer, Page header/footer를 제외한 리포트 페이지 영역.
 */
declare class PageBody extends PageSection {
    static readonly $_ctor: string;
    private _backItems;
    private _frontItems;
    private _bodyItems;
    constructor();
    /**
     * backItems
     */
    get backItems(): ReportItem[];
    get backItemsContainer(): PageItemContainer;
    /**
     * frontItems
     */
    get frontItems(): ReportItem[];
    get frontItemsContainer(): PageItemContainer;
    /**
     * items
     */
    get bodyItems(): ReportItem[];
    get itemsContainer(): ColumnBoxContainer;
    get outlineLabel(): string;
    canParentOf(itemType: string): boolean;
    canResize(dir: ResizeDirection): boolean;
    protected _doLoad(loader: IReportLoader, src: any): void;
    protected _loadItems(loader: IReportLoader, src: any): void;
    protected _ignoreItems(): boolean;
    protected _doSave(target: object): void;
    canRemove(item: ReportItem): boolean;
}

interface ISize {
    width: number;
    height: number;
}
/** @internal */
declare class Size implements ISize {
    width: number;
    height: number;
    static readonly EMPTY: Size;
    static empty(): Size;
    static create(w?: number, h?: number): Size;
    constructor(width?: number, height?: number);
    /** isEmpty */
    get isEmpty(): boolean;
    clone(): Size;
    equals(sz: Size): boolean;
    setEmpty(): Size;
    set(width: number, height: number): Size;
    round(): Size;
    toString(): string;
}

/**
 * Asset item base.
 */
declare abstract class AssetItem {
    name: string;
    data: string;
    parent: AssetGroup;
    description: string;
    tag: any;
    constructor(name: string, data: string);
    get isGroup(): boolean;
    save(target: any): any;
    protected _parsetData(data: string): void;
    protected _doSave(target: any): void;
}
/**
 * Image data url.
 */
declare class ImageAsset extends AssetItem {
    protected _doSave(target: any): void;
}
/**
 * Svg xml.
 */
declare class SvgAsset extends AssetItem {
    protected _doSave(target: any): void;
}
/**
 * Color palette
 */
declare class ColorPaletteAsset extends AssetItem {
    protected _parsetData(data: string): void;
    protected _doSave(target: any): void;
}
/**
 * Chartist Theme
 */
declare class ChartistThemeAsset extends AssetItem {
    theme: object;
    protected _parsetData(data: string): void;
    protected _doSave(target: any): void;
}
/**
 * Highchart Theme
 */
declare class HighchartThemeAsset extends AssetItem {
    theme: object;
    protected _parsetData(data: string): void;
    protected _doSave(target: any): void;
}
/**
 * Asset folder.
 */
declare class AssetGroup extends AssetItem {
    path: string;
    items: AssetItem[];
    constructor(name: string);
    get count(): number;
    get(name: string): AssetItem;
    save(target: object[]): void;
    indexOf(item: AssetItem): number;
    get isGroup(): boolean;
    $_findItem(path: string, groupOnly?: boolean): AssetItem;
}
/**
 * Asset 관리자.
 * 모든 asset의 name은 경로와 상관없이 유일해야 한다.
 * {
 *  'folder path': [asset items,...],
 *  'folder path': [asset items,...]
 * }
 *
 * 리포트에 저장되는 asset들 외에 application에서 제공하는 asset들(stock assets)이
 * application asset view에 표시되도록 하고,
 * 그 asset들이 report에 추가되면 자동으로 report에도 추가한다.
 */
declare class AssetManager extends EventAware {
    private _root;
    private _nameMap;
    constructor();
    protected _doDispose(): void;
    /** root */
    get root(): AssetGroup;
    load(src: any): void;
    private $_collectGroups;
    save(target: object): void;
    private $_checkPath;
    get(name: string): AssetItem;
    getImage(name: string): string;
    getSvg(name: string): string;
    getPalette(name: string): ColorPaletteAsset;
    getChartist(name: string): ChartistThemeAsset;
    getHighchart(name: string): HighchartThemeAsset;
    findGroup(path: string): AssetGroup;
    forceGroup(path: string): AssetGroup;
    addGroup(parent: string | AssetGroup, group: string): AssetGroup;
    removeGroup(group: string | AssetGroup): boolean;
    add(group: string | AssetGroup, item: AssetItem): void;
    remove(item: AssetItem): void;
    addImage(group: string | AssetGroup, name: string, imageData: string): ImageAsset;
    addSvg(group: string | AssetGroup, name: string, svgData: string): SvgAsset;
    addPalette(group: string | AssetGroup, name: string, paletteData: string): ColorPaletteAsset;
    addCharitst(group: string | AssetGroup, name: string, themeData: string): ChartistThemeAsset;
    addHighchart(group: string | AssetGroup, name: string, themeData: string): HighchartThemeAsset;
    getTree(root?: string): object;
    private $_parseTree;
    getValidName(prefix: string): string;
    isValidName(name: string): boolean;
    private $_findGroup;
    private $_addGroup;
    private $_removeGroup;
    private $_addItem;
    private $_removeItem;
    private $_addImage;
    private $_addSvg;
    private $_addPalette;
    private $_addChartist;
    private $_addHighchart;
}

/** @internal */
declare class DatetimeReader {
    static readonly Formats: string[];
    static readonly Default: DatetimeReader;
    static initialize(): void;
    private _format;
    private _type;
    private _parser;
    constructor(format: string);
    /** format */
    get format(): string;
    set format(value: string);
    /** amText */
    get amText(): string;
    set amText(value: string);
    /** pmText */
    get pmText(): string;
    set pmText(value: string);
    /** baseYear */
    get baseYear(): number;
    set baseYear(value: number);
    toDate(value: string): Date;
    private parse;
}

/**@internal */
declare abstract class ExpressionRuntime extends Base {
    constructor();
    isIdentifier(token: string): number;
    evaluateIdentifier(idKey: number): void;
    evaluateIndexerI(idKey: number, index: number): any;
    evaluateIndexerS(idKey: number, index: string, capital: boolean): any;
    evaluateFunc(idKey: number, param: string): any;
}
/**@internal */
declare abstract class ExpressionNode {
    constructor();
    get value(): any;
    get asLiteral(): any;
    prepareValue(): void;
    getLiteral(): ExpressionNode;
    isIdentifier(value: any): boolean;
    abstract evaluate(runtime: ExpressionRuntime): any;
    toString(): string;
}

/**@internal */
declare class FieldValueRuntime extends ExpressionRuntime {
    private _data;
    private _fieldMap;
    private _row;
    constructor();
    protected _doDispose(): void;
    prepare(data: BandData): FieldValueRuntime;
    setRow(row: number): FieldValueRuntime;
    isIdentifier(token: string): number;
    evaluateIdentifier(idKey: number): any;
    evaluateIndexerS(idKey: number, index: string, capitalized: boolean): any;
    evaluateFunc(idKey: number, param: string): any;
}

interface IBandDataField {
    fieldName: string;
    dataType?: "text" | "number" | "bool" | "datetime";
    expression?: string;
    format?: string;
    description?: string;
    sample?: any;
    dateReader?: DatetimeReader;
    width?: number;
}
interface IBandRowGroup {
    parent?: IBandRowGroup;
    level: number;
    row: number;
    count: number;
    trows?: number;
    value?: any;
    children: IBandRowGroup[];
}
interface IBandRowGroupFooter {
    group: IBandRowGroup;
}
interface IBandData extends IReportData {
    fieldCount: number;
    rowCount: number;
    getField(index: number): IBandDataField;
    getFields(): IBandDataField[];
    containsField(fieldName: string): boolean;
    getRowValue(row: number, field: string | number): any;
    getFieldValues(field: string | number): any[];
    equalValues(row: number, fields: string[], values: any[]): boolean;
    equalRows(row1: number, row2: number, fields?: string[]): boolean;
    groupBy(fields: string[], rowCount: number): (number | IBandRowGroup | IBandRowGroupFooter)[];
}
declare abstract class BandData extends ReportData$1 {
    protected _fields: IBandDataField[];
    protected _fieldMap: any;
    protected _calcFieldRuntime: FieldValueRuntime;
    constructor(name: string, fields: IBandDataField[], dp: IReportDataProvider);
    get fields(): IBandDataField[];
    get fieldCount(): number;
    abstract get rowCount(): number;
    getFields(): IBandDataField[];
    getField(index: number): IBandDataField;
    getFieldByName(fieldName: string): IBandDataField;
    getFieldIndex(field: string): number;
    containsField(fieldName: string): boolean;
    indexOfField(field: IBandDataField): number;
    setField(index: number, field: IBandDataField): void;
    getSaveFields(): IBandDataField[];
    getNextFieldName(prefix?: string): string;
    getFieldNames(): string[];
    addField(index: number, field: IBandDataField): boolean;
    removeField(field: IBandDataField): boolean;
    abstract getRowValue(row: number, field: string | number): any;
    groupBy(fields: string[]): (number | IBandRowGroup | IBandRowGroupFooter)[];
    readValue(field: IBandDataField, value: any): any;
    readRow(row: any): any;
    dateToStr(field: IBandDataField, v: Date): string;
    abstract getFieldValues(field: string | number): any[];
    get isBand(): boolean;
    preparePrint(ctx: PrintContext, design: boolean): void;
    protected _readRows(): void;
    protected _prepareCalcField(fields: IBandDataField[], fieldMap: any, calcField: IBandDataField, index: number, node: ExpressionNode): void;
}

/**
 * Design-time data provider
 */
declare class DesignDataManager extends EventAware implements IReportDataProvider {
    static readonly DATA_ADDED = "onDesignDataManagerDataAdded";
    static readonly DATA_REMOVED = "onDesignDataManagerDataRemoved";
    static readonly DATA_UPDATED = "onDesignDataManagerDataUpdated";
    static readonly NAME_CHANGED = "onDesignDataManagerNameChanged";
    static readonly FIELD_NAME_CHANGED = "onDesignDataManagerFieldNameChanged";
    private _commands;
    private _dataMap;
    private _contextData;
    constructor(commands: EditCommandStack);
    protected _doDispose(): void;
    get designTime(): boolean;
    preparePrint(ctx: PrintContext): void;
    getAll(): IReportData[];
    getNames(): string[];
    get(name: string): IReportData;
    getContextValue(path: string): any;
    /**
     * @param path data name + "." + data path
     */
    getValue(path: string, row: number): any;
    getValueAt(data: string, path: string, row: number): any;
    getFieldValues(data: string, field: string): any[];
    addData(data: IReportData): boolean;
    removeData(data: string | IReportData): IReportData;
    dataNameChanged(data: IReportData, oldName: string): void;
    fieldNameChanged?(data: IReportData, newName: string, oldName: string): void;
    load(source: any): DesignDataManager;
    save(target: object): void;
    getFieldIndex(data: string, field: string): number;
    updateField(data: BandData, index: number, field: IBandDataField): void;
    addField(data: BandData, index: number, field: IBandDataField): void;
    removeField(data: BandData, field: IBandDataField): void;
    renameData(data: IReportData, newName: string): void;
    private $_register;
    private $_unregister;
    private $_fireDataAdded;
    private $_fireDataRemoved;
    private $_fireDataUpdated;
}

/**
 * TableBase가 자동 생성한다.
 * 자식 하나만 가질 수 있다.
 */
declare abstract class TableCellItem extends CellGroup {
    constructor(item: ReportItem);
    /**
     * table
     */
    get table(): TableBase;
    /**
     * col
     */
    get col(): number;
    /**
     * row
     */
    get row(): number;
    canChangeChildProp(item: ReportPageItem, prop: string, value: any): boolean;
}
/**
 * Table 행 모델.
 */
declare class TableRow extends ReportItemCollectionItem {
    static readonly PROP_HEIGHT = "height";
    private static readonly styleProps;
    static readonly PROPINFOS: IPropInfo[];
    private _height;
    private _index;
    private _heightDim;
    constructor(collection: TableRowCollection, src?: any);
    getEditProps(): IPropInfo[];
    getCollectionLabel(): string;
    /** table */
    get table(): TableBase;
    /** index */
    get index(): number;
    /**
     * height
     */
    get height(): string | number;
    set height(value: string | number);
    getHeight(bounds: number): number;
    get itemType(): string;
    get page(): ReportPage;
    get displayPath(): string;
    get collection(): TableRowCollection;
    get marqueeParent(): ReportItem;
    get level(): number;
    isAncestor(group: ReportGroupItem): boolean;
    canRemoveFrom(): boolean;
    canSelectedWith(other: ISelectionSource): boolean;
    protected _getStyleProps(): string[];
    protected _doLoad(src: any): void;
    protected _doSave(target: any): any;
}
/**
 * Table row object collection.
 */
declare class TableRowCollection extends ReportItemCollection<TableRow> {
    private _table;
    private _rows;
    private _heights;
    constructor(table?: TableBase);
    get outlineParent(): IOutlineSource;
    get outlineLabel(): string;
    get outlineExpandable(): boolean;
    get outlineItems(): IOutlineSource[];
    getSaveType(): string;
    /** table */
    get table(): TableBase;
    /** count */
    get count(): number;
    set count(value: number);
    get items(): ReportPageItem[];
    load(src: any, count: number): number;
    save(target: any): void;
    get(index: number): TableRow;
    /**
     * i1과 i2에 위치한 아이템과 그 사이에 포함된 아이템들을 순서대로 배열로 리턴한다.
     */
    getRange(i1: number, i2: number): TableRow[];
    indexOf(row: TableRow): number;
    getHeights(): DimensionCollection;
    /**
     * @internal
     */
    add(row: TableRow | ConfigObject, index?: number): TableRow;
    /**
     * @internal
     */
    remove(index: number): boolean;
    /**
     * @internal
     */
    move(index: number, count: number, newRow: number): void;
    /**
     * 아래쪽 이웃 행의 높이를 줄이거나 늘이면서 행의 높이를 변경한다.
     */
    adjustHeights(row: number, rowPoints: number[], newSize: number): any[];
    get page(): ReportPage;
    get displayPath(): string;
    get level(): number;
    get marqueeParent(): ReportItem;
    isAncestor(group: ReportGroupItem): boolean;
    private $_add;
    private $_invalidateRows;
    private $_rowChanged;
}
declare type TableCellStyleCallback = (ctx: PrintContext, cell: TableCell, row: number) => {
    [key: string]: string | undefined;
};
/**
 * Table cell model. {@link TableCellCollection} 구성 요소로 포함된다.
 */
declare class TableCell extends ReportItemCollectionItem {
    static readonly PROP_COL = "col";
    static readonly PROP_ROW = "row";
    static readonly PROP_COLSPAN = "colspan";
    static readonly PROP_ROWSPAN = "rowspan";
    static readonly PROP_APPLY_END_STYLES = "applyEndStyles";
    static readonly PROP_ON_GET_STYLES = "onGetStyles";
    static readonly PROP_STYLE_CALLBACK = "styleCallback";
    static readonly PROPINFOS: IPropInfo[];
    private static readonly styleProps;
    private _colspan;
    private _rowspan;
    private _applyEndStyles;
    private _styleCallback;
    private _onGetStyles;
    private _row;
    private _col;
    private _styleCallbackFunc;
    private _styleCallbackDelegate;
    constructor(collection: TableCellCollection, row: number, col: number, src?: any);
    /** @internal */
    get outlineLabel(): string;
    getEditProps(): IPropInfo[];
    get table(): TableBase;
    get row(): number;
    get col(): number;
    get height(): number;
    get width(): number;
    get bottom(): number;
    get right(): number;
    get isSingle(): boolean;
    /**
     * col span
     */
    get colspan(): number;
    set colspan(value: number);
    /**
     * row span
     */
    get rowspan(): number;
    set rowspan(value: number);
    /**
     * true면 span 됐을 때 마지막 셀에 해당하는 tableRowStyles, tableColumnStyles를 적용한다.
     */
    get applyEndStyles(): boolean;
    set applyEndStyles(value: boolean);
    /** styleCallback */
    get styleCallback(): TableCellStyleCallback;
    set styleCallback(value: TableCellStyleCallback);
    /** onGetStyles */
    get onGetStyles(): string;
    set onGetStyles(value: string);
    adoptDragSource(source: any): IDropResult;
    get itemType(): string;
    get collection(): TableCellCollection;
    get page(): ReportPage;
    get displayPath(): string;
    get marqueeParent(): ReportItem;
    protected _getStyleProps(): string[];
    setProps(src: any): void;
    canSelectedWith(other: ISelectionSource): boolean;
    protected _doLoad(src: any): void;
    protected _doSave(target: any): void;
}
declare class TableSelection implements ISelectionSource {
    selectItem: TableCell;
    cols: number;
    rows: number;
    private _cell;
    constructor(cell: TableCell, cols: number, rows: number);
    get table(): TableBase;
    get cell(): TableCell;
    get col(): number;
    get row(): number;
    get right(): number;
    get bottom(): number;
    canSelectedWith(other: ISelectionSource): boolean;
    contains(row: number, col: number): boolean;
    containsCell(cell: TableCell): boolean;
    isSingle(ignoreHiddens: boolean): boolean;
    getCells(ignoreHiddens: boolean): TableCell[];
    resizeTo(cell: TableCell): boolean;
    resizeBy(dx: number, dy: number): boolean;
    equals(cell: TableCell): boolean;
}
/**
 * @internal
 * 테이블 셀 모델인 TabelCell들의 집합.
 */
declare class TableCellCollection extends ReportItemCollection<TableCell> {
    private _table;
    private _cells;
    private _vcells;
    constructor(table?: TableBase);
    get outlineParent(): IOutlineSource;
    get outlineLabel(): string;
    get outlineExpandable(): boolean;
    get outlineItems(): IOutlineSource[];
    getSaveType(): string;
    isCollectionProp(): boolean;
    /** table */
    get table(): TableBase;
    /** count */
    get count(): number;
    get items(): ReportPageItem[];
    /** rowCount */
    get rowCount(): number;
    /** colCount */
    get colCount(): number;
    getColCount(row: number): number;
    get(index: number): TableCell;
    getAt(row: number, col: number): TableCell;
    getRectangle(from: TableCell, to: TableCell): IRect;
    getRectangleCells(from: TableCell, to: TableCell, ignoreHiddens?: boolean): TableCell[];
    /**
     * table rowCount, colCount 변경 시 table에서도 호출한다.
     * rowCount, colCount가 줄어들어도 기존 cell들은 제거하지 않는다.
     */
    prepareCells(): void;
    load(src: any): void;
    save(target: any): void;
    resetVisibles(): void;
    /**
     * @internal
     * 모든 셀들의 속성들과 스타일값들을 저장한다.
     * restoreCells()로 복원시킬 수 있다.
     */
    saveCells(): any[][];
    /**
     * @internal
     * saveCells()로 저장된 모든 셀들의 속성들과 스타일값들로 재설정한다.
     * RemoveTableRowCommand 참조.
     */
    restoreCells(src: any[][]): void;
    /**
     * @internal
     * cell들은 남겨두고 row 이전 cell들의 span값들만 조정한다.
     * RemoveTableRowCommand 참조.
     */
    truncateRow(row: number): any[][];
    /**
     * @internal
     * cell들은 남겨두고 col 이전 cell들의 span값들만 조정한다.
     */
    truncateCol(col: number): any[][];
    removeRow(row: number): any[][];
    removeRows(row: number, count: number): any[][];
    addRow(row: number): any[][];
    removeCol(col: number): any[][];
    removeCols(col: number, count: number): any[][];
    addCol(col: number): any[][];
    private $_resetPositions;
    /**
     * 셀들에 설정된 스타일등을 유지하기 위해 cell 들의 위치를 변경 시킨다.
     * 병합된 셀을 분리해서 이동할 수 없다. 즉, span 상태는 변경되지 않는다.
     */
    moveRows(row: number, count: number, newRow: number): any;
    /**
     * 셀들에 설정된 스타일등을 유지하기 위해 cell 들의 위치를 변경 시킨다.
     * 병합된 셀을 분리해서 이동할 수 없다. 즉, span 상태는 변경되지 않는다.
     */
    moveCols(col: number, count: number, newCol: number): any;
    /**
     * 지정한 범위와 범위에 속한 기존 병합을 모두 포함하는 병합 범위 리턴.
     */
    getMergeBounds(r1: number, c1: number, r2: number, c2: number): TableBounds;
    mergeBoundsOf(sel: TableSelection): TableBounds;
    merge(r1: number, c1: number, r2: number, c2: number): any[][];
    mergeSelection(sel: TableSelection): any[][];
    unmerge(cell: TableCell): any[][];
    get page(): ReportPage;
    get displayPath(): string;
    get level(): number;
    get marqueeParent(): ReportItem;
    isAncestor(group: ReportGroupItem): boolean;
    protected _createCell(row: number, col: number): TableCell;
}
declare type TableBounds = {
    r1: number;
    c1: number;
    r2: number;
    c2: number;
};
declare type TableCellSpan = {
    r: number;
    c: number;
    v: TableCell;
    m: TableCellItem;
};
/**
 * 자식 item들을 TableCellItem에 추가해서 배치한다.
 * 페이지를 넘어갈 수 없다.
 * // TODO: columns(컬럼 단위 정보, width, style...), rows(행 단위 정보, height, style...) 추가할 것!
 */
declare abstract class TableBase extends CellContainer {
    static readonly PROP_ROW_COUNT = "rowCount";
    static readonly PROP_MIN_ROW_HEIGHT = "minRowHeight";
    static readonly PROP_ROWS = "rows";
    static readonly PROP_TABLE_CELL_STYLES = "cellStyles";
    static readonly PROP_CELL_LAYOUT = "table_cell_layout";
    static readonly PROP_FIXED = "fixed";
    static readonly PROP_TABLE_COL = "col";
    static readonly PROP_TABLE_ROW = "row";
    static readonly PROPINFOS: IPropInfo[];
    static readonly TABLE_CHILD_PROPS: IPropInfo[];
    private static readonly TABLE_STYLES;
    private static readonly CELL_STYLES;
    private _rowCount;
    private _minRowHeight;
    onCellChanged: (item: ReportItem, prop: string, oldValue: any) => void;
    private _fixed;
    private _cellStyles;
    private _rows;
    private _cells;
    private _cellMap;
    private _spans;
    private _minRowHeightDim;
    private _focus;
    private _spanDirty;
    private _itemDirty;
    constructor(name: string);
    protected _createCells(): TableCellCollection;
    getSubStyleProps(prop: string): IPropInfo[];
    protected _getSubStyle(prop: string, style: string): any;
    protected _setSubStyle(prop: string, style: string, value: any): void;
    get outlineItems(): IOutlineSource[];
    /** colCount */
    abstract get colCount(): number;
    /** rowCount */
    get rowCount(): number;
    set rowCount(value: number);
    /** rows */
    get rows(): TableRowCollection;
    /** cells */
    get cells(): TableCellCollection;
    /**
     * minimum table row height
     */
    get minRowHeight(): string;
    set minRowHeight(value: string);
    /** cellStyles */
    get cellStyles(): Styles;
    set cellStyles(value: Styles);
    /**
     * true이면 내부 table element의 너비를 '100%'로 하지 않고,
     * colGroup 전체 너비로 설정한다.
     * 즉, 모든 컬럼들의 너비가 모두 고정인 경우, table의 너비가 부도 div 대신 컬럼 너비들의 합이 된다.
     */
    get fixed(): boolean;
    set fixed(value: boolean);
    abstract getCellWidths(): DimensionCollection;
    abstract getColumn(col: number): TableColumnBase;
    getRow(index: number): TableRow;
    getRowHeights(): DimensionCollection;
    getCell(row: number, col: number): TableCell;
    getCellItemAt(row: number, col: number): TableCellItem;
    getCellItem(cell: TableCell): TableCellItem;
    isHiddenAt(row: number, col: number): boolean;
    isHiddenCell(cell: TableCell): boolean;
    getHeadCell(cell: TableCell): TableCell;
    getLeftCol(cell: TableCell): number;
    getTopRow(cell: TableCell): number;
    getMinRowHeight(): number;
    getColItems(col: number, same?: boolean): ReportItem[];
    getRowItems(row: number, same?: boolean): ReportItem[];
    getRowItemsFrom(rowFrom: number): ReportItem[];
    getRectItems(r1: number, c1: number, r2: number, c2: number, exceptFirst?: boolean): ReportItem[];
    prepareLayout(): TableCellSpan[][];
    setFocus(focus: {
        col: number;
        row: number;
    }): void;
    /**
     * @internal
     * 이 함수를 통해 행을 삭제하면 undo할 수 없다.
     * 대신 {@link Report.removeItem}를 호출해야 한다.
     */
    removeRow(row: number | TableRow): void;
    /**
     * @internal
     * 이 함수를 통해 행을 추가하면 undo할 수 없다.
     * 대신 {@link Report.addTableRow}를 호출해야 한다.
     */
    addRow(index: number, row: TableRow): TableRow;
    /**
     * @internal
     * 옮기려는 행들에 범위를 벗어난 셀 병합이 존재하면 이동할 수 없다.
     * 옮기려는 위치에 병합된 셀의 끝이 아닌 것이 포함되면 그 자리로 이동시킬 수 없다.
     */
    canMoveRows(row: number, count: number, newRow: number, alert?: boolean): boolean;
    getNearestMovableRow(row: number, count: number, delta: number): number;
    moveRows(row: number, count: number, newRow: number, force?: boolean): boolean;
    /**
     * @internal
     * 옮기려는 컬럼셀들에 범위를 벗어난 셀 병합이 존재하면 이동할 수 없다.
     * 옮기려는 위치에 병합된 셀의 끝이 아닌 것이 포함되면 그 자리로 이동시킬 수 없다.
     */
    canMoveCols(col: number, count: number, newCol: number, alert?: boolean): boolean;
    getNearestMovableColumn(col: number, count: number, delta: number): number;
    /**
     * @internal
     * For debugging.
     */
    checkCounts(): void;
    getSelection(cell: TableCell): TableSelection;
    /**
     * 가장 상단의 item만 보존된다.
     */
    mergeCells(r1: number, c1: number, r2: number, c2: number): void;
    protected _getEditProps(): IPropInfo[];
    protected _getStyleProps(): string[];
    protected _doDefaultInit(loader: IReportLoader, parent: ReportGroupItem, hintWidth: number, hintHeight: number): void;
    protected _doLoad(loader: IReportLoader, src: any): void;
    protected _doSave(target: any): void;
    protected _doSaveItems(target: any[], items: ReportItem[]): void;
    protected _getChildPropInfos(item: ReportItem): IPropInfo[];
    protected _doLoadChild(child: ReportItem, src: any): void;
    protected abstract _createCell(item: ReportItem): TableCellItem;
    protected _prepareCellGroup(item: ReportItem): CellGroup;
    protected _unprepareCellGroup(item: ReportItem): CellGroup;
    protected _doItemAdded(item: ReportItem, index: number): void;
    protected _doItemRemoved(item: ReportItem, index: number): void;
    protected _doItemChanged(item: ReportItem, prop: string, value: any, oldValue: any): void;
    isAncestorOf(item: ReportPageItem): boolean;
    protected _createRows(): TableRowCollection;
    protected _spanChanged(cell: TableCell): void;
    protected _resetCells(): void;
    protected _removeCols(index: number, count: number): void;
    protected _addCols(col: number, count: number): void;
    protected _moveCols(col: number, count: number, newCol: number): void;
    protected _removeRows(index: number, count: number): void;
    protected _addRows(index: number, count: number): void;
    protected _moveRows(row: number, count: number, newRow: number): void;
    canChangeChildProp(item: ReportPageItem, prop: string, value: any): boolean;
    private $_rowChanged;
    private $_resetSpans;
    protected _addColumn(index: number): void;
    protected _removeColumn(col: number): void;
}
declare abstract class TableColumnBase extends ReportItemCollectionItem {
    static readonly PROP_WIDTH = "width";
    static readonly PROPINFOS: IPropInfo[];
    private static readonly styleProps;
    private _width;
    private _index;
    private _widthDim;
    constructor(collection: ReportItemCollection<any>, src?: any);
    getEditProps(): IPropInfo[];
    getCollectionLabel(): string;
    /** index */
    get index(): number;
    /**
     * width
     */
    get width(): ValueString;
    set width(value: ValueString);
    getWidth(bounds: number): number;
    get itemType(): string;
    get page(): ReportPage;
    get level(): number;
    canSelectedWith(other: ISelectionSource): boolean;
    protected _getStyleProps(): string[];
    protected _doLoad(src: any): void;
    protected _doSave(target: any): any;
    protected abstract _changed(prop: string, newValue: any, oldValue: any): void;
}
declare abstract class TableColumnCollectionBase<T extends ReportGroupItem, C extends TableColumnBase> extends ReportItemCollection<C> {
    private _owner;
    private _columns;
    private _widths;
    constructor(owner?: T);
    get outlineParent(): IOutlineSource;
    get outlineLabel(): string;
    get outlineExpandable(): boolean;
    get outlineItems(): IOutlineSource[];
    getSaveType(): string;
    /** owner */
    get owner(): T;
    /** count */
    get count(): number;
    set count(value: number);
    get items(): ReportPageItem[];
    /** columns */
    get columns(): C[];
    load(src: any, count: number): number;
    save(target: any): void;
    get(index: number): C;
    /**
     * i1과 i2에 위치한 아이템과 그 사이에 포함된 아이템들을 순서대로 배열로 리턴한다.
     */
    getRange(i1: number, i2: number): C[];
    indexOf(column: C): number;
    /**
     * 컬럼 너비들을 절대/상대 값으로 지정한다.
     * 지정하지 않은 컬럼 너비는 컬럼에 속한 셀들을 계산한 최대 너비로 설정된다.
     * 상대 너비는 '%'로 지정하고, 부모에서 절대 너비를 제외한 나머지 너비를 기준으로
     * 상대 너비를 모두 더한 값에 대한 비율로 설정된다.
     * 너비 합계가 부모 너비보다 클 수 있다.
     */
    getWidths(): DimensionCollection;
    add(column: C | ConfigObject, index?: number): C;
    /**
     * @internal
     */
    remove(index: number): boolean;
    /**
     * @internal
     */
    clear(): boolean;
    /**
     * @internal
     */
    move(index: number, count: number, newIndex: number): void;
    /**
     * 오른쪽 이웃 컬럼의 너비를 줄이거나 늘이면서 컬럼의 너비를 변경한다.
     */
    adjustWidths(col: number, colPoints: number[], newSize: number): any[];
    get page(): ReportPage;
    get displayPath(): string;
    get level(): number;
    get marqueeParent(): ReportItem;
    isAncestor(group: ReportGroupItem): boolean;
    protected abstract _createColumn(src: any): C;
    private $_add;
    private $_invalidateColumns;
    private $_columnChanged;
}

/**@internal */
declare class DataBandSummaryRuntime extends ExpressionRuntime {
    private _band;
    private _data;
    private _master;
    private _fieldMap;
    private _idxMap;
    private _masterFieldMap;
    private _masterIdxMap;
    private _group;
    private _rows;
    private _masterRow;
    private _rowCount;
    constructor(band: DataBand);
    protected _doDispose(): void;
    prepare(data: BandData, master: IBandData): DataBandSummaryRuntime;
    setGroup(group: IBandRowGroup): DataBandSummaryRuntime;
    setRows(rows: number[], masterRow?: number): DataBandSummaryRuntime;
    setRowCount(count: number): DataBandSummaryRuntime;
    isIdentifier(token: string): number;
    evaluateIdentifier(idKey: number): any;
    evaluateFunc(idKey: number, param: string): any;
    private $_getRows;
}

/**
 * DataBand row group base.
 */
declare abstract class DataBandRowGroup extends ReportGroupItem {
    static readonly PROP_FIELD = "field";
    static readonly PROPINFOS: IPropInfo[];
    private _field;
    constructor(name: string);
    get outlineLabel(): string;
    canRemoveFrom(): boolean;
    getEditProps(): IPropInfo[];
    /** field */
    get field(): string;
    set field(value: string);
    get pathLabel(): string;
    protected _doLoad(loader: IReportLoader, src: any): void;
    protected _doSave(target: object): void;
    getPropDomain(prop: IPropInfo): any[];
}
/**
 * Data band base class.
 *
 * [제한 사항]
 * 1. detail band는 multi columns 불가. (TODO: master가 multi column이 아니면 가능하지 않을까?)
 */
declare abstract class DataBand extends ReportGroupItem {
    static readonly PROP_DATA_BAND_MASTER_FIELDS = "masterFields";
    static readonly PROP_DATA_BAND_KEY_FIELDS = "keyFields";
    static readonly PROP_DATA_BAND_ROWS_PER_MASTER = "rowsPerMaster";
    static readonly PROP_DATA_BAND_SECTION_COUNT = "sectionCount";
    static readonly PROP_DATA_BAND_SECTIONLAYOUT = "sectionLayout";
    static readonly PROP_DATA_BAND_SECTION_GAP = "sectionGap";
    static readonly PROP_DATA_BAND_MAX_ROW_COUNT = "maxRowCount";
    static readonly PROP_DATA_BAND_ROWS_PER_PAGE = "rowsPerPage";
    static readonly PROP_DATA_BAND_MAX_ROWS_PER_PAGE = "maxRowsPerPage";
    static readonly PROP_DATA_BAND_REPEAT_MASTER_ROW = "repeatMasterRow";
    static readonly PROP_DATA_BAND_REPEAT_DETAIL_HEADER = "repeatDetailHeader";
    static readonly PROP_DATA_BAND_REPEAT_DETAIL_FOOTER = "repeatDetailFooter";
    static readonly PROP_DATA_BAND_END_ROW_COUNT = "endRowCount";
    static readonly PROP_DATA_BAND_MAX_END_ROW_COUNT = "maxEndRowCount";
    static readonly PROP_DATA_BAND_END_ROW_MESSAGE = "endRowMessage";
    static readonly PROP_DATA_BAND_ALWAYS_HEADER = "alwaysHeader";
    static readonly PROPINFOS: IPropInfo[];
    private _sectionCount;
    private _sectionLayout;
    private _sectionGap;
    private _maxRowCount;
    private _rowsPerPage;
    private _maxRowsPerPage;
    private _endRowCount;
    private _maxEndRowCount;
    private _endRowMessage;
    private _masterFields;
    private _keyFields;
    private _rowsPerMaster;
    private _repeatMastreRow;
    private _repeatDetailHeader;
    private _repeatDetailFooter;
    private _alwaysHeader;
    private _detail;
    private _master;
    private _keyFlds;
    private _masterFlds;
    pageNo: number;
    detailRows: number;
    masterValues: any;
    private _dataObj;
    private _designData;
    private _fieldSummary;
    private _summaryRuntime;
    constructor(name: string);
    get dataObj(): IBandData;
    get designData(): IBandData;
    /**
     * detail band.
     */
    get detail(): DataBandCollection;
    /**
     * detail band인가?
     */
    get isDetail(): boolean;
    /**
     * master band.
     */
    get master(): DataBand;
    /**
     * band level.
     * 최상위 band이면 0.
     */
    get bandLevel(): number;
    /**
     * section count
     */
    get sectionCount(): number;
    set sectionCount(value: number);
    /**
     * section layout
     */
    get sectionLayout(): BandSectionLayout;
    set sectionLayout(value: BandSectionLayout);
    /**
     * section gap
     */
    get sectionGap(): number;
    set sectionGap(value: number);
    /**
     * 최대 출력 행 수.
     * 0보다 큰 값으로 설정하면,
     * 디테일 밴드일 경우 해당 마스터 내에서 최대 행수이다.
     * rowsPerMaster로 표시할 디테일 행들을 설정하는 경우 이 속성을 지정할 필요가 없다(?)
     */
    get maxRowCount(): number;
    set maxRowCount(value: number);
    /**
     * 0보다 큰 값으로 설정하면,
     * 지정한 행 수만큼 최대 출력하고 다음 페이지로 넘어간다.
     * 또, 디테일인 경우 마스터행에 대한 디테일행들이 모두 출력되면 다음 페이지로 넘어간다.
     * 지정한 행 수만큼 한 페이지에 출력하지 못하면,
     * 다음 페이지에 나머지를 출력하고 페이지를 넘긴다.
     * 페이지 중단 없이 이어서 출력하려면 {@link maxRowsPerPage}로 설정한다.
     */
    get rowsPerPage(): number;
    set rowsPerPage(value: number);
    /**
     * 0보다 큰 값으로 설정하면,
     * 지정한 행 수만큼 최대 출력하고 다음 페이지로 넘어간다.
     * 또, 디테일인 경우 마스터행에 대한 디테일행들이 모두 출력되면 다음 페이지로 넘어간다.
     * 지정한 행 수만큼 한 페이지에 출력하지 못하면 중단하고
     * 다음 페이지에서 다음 행부터 다시 출력한다.
     * {@link rowsPerPage}가 0보다 큰 값으로 설정되면 이 속성은 무시된다.
     */
    get maxRowsPerPage(): number;
    set maxRowsPerPage(value: number);
    /**
     * 데이터행 수와 상관없이 마지막 페이지에 표시돼야 할 행수.
     * 0보다 큰 값으로 설정하면,
     * 실제 데이터행 이후 행은 빈 행으로 표시된다.
     * 마지막 페이지에 적용된다.
     * 마지막 페이지에 빈 행을 모두 출력할 수 없는 경우,
     * 다음 페이지에 나머지 빈 행을 출력하고 페이지를 넘긴다.
     * 페이지 중단 없이 남은 영역만 빈 행으로 채우려면 {@link maxEndRowCount}를 설정한다.
     *
     * 그룹 설정과 같이 적용할 수 없다. 즉, 그룹이 설정되면 이 속성은 무시된다.
     */
    get endRowCount(): number;
    set endRowCount(value: number);
    /**
     * 데이터행 수와 상관없이 마지막 페이지에 표시돼야 할 행수.
     * 0보다 큰 값으로 설정하면,
     * 실제 데이터행 이후 행은 빈 행으로 표시된다.
     * 마지막 페이지에 적용된다.
     * 마지막 페이지에 출력할 수 있는 만큼만 빈 행을 출력한다.
     * {@link endRowCount}가 0보다 큰 값으로 설정되면 이 속성은 무시된다.
     *
     * 그룹 설정과 같이 적용할 수 없다. 즉, 그룹이 설정되면 이 속성은 무시된다.
     */
    get maxEndRowCount(): number;
    set maxEndRowCount(value: number);
    /**
     * 실제 데이터행 수가 {@link endRowCount} 보다 적을 때,
     * 마자막 data 행 아래에 표시할 메시지.
     */
    get endRowMessage(): string;
    set endRowMessage(value: string);
    /**
     * keyFields에 대응하는 master band data의 필드 목록.
     * 지정하지 않으면 keyFields와 동일한 필드 목록이 사용된다.
     * 디테일밴드에 지정.
     */
    get masterFields(): string;
    set masterFields(value: string);
    /**
     * master band의 필드에 대응하는 필드 목록.
     * 이 필드들의 값이 master행의 값들과 동일한 행들이 master 행 다음에 출력된다.
     * 디테일밴드에 지정.
     */
    get keyFields(): string;
    set keyFields(value: string);
    /**
     * keyFields를 지정하지 않고, 0보다 큰 값으로 출력할 디테일 행수를 지정한다.
     * 이 밴드(master band) 행마다 출력해야할 최대 디테일 밴드 행 수.
     * keyFields가 지정되면 이 속성은 무시된다.
     * 디테일밴드에 지정.
     */
    get rowsPerMaster(): number;
    set rowsPerMaster(value: number);
    /**
     * 디테일이 페이지를 넘어가는 경우 매 페이지마다 마스터 행을 출력할 지 여부.
     * 마스터밴드에 지정.
     */
    get repeatMasterRow(): boolean;
    set repeatMasterRow(value: boolean);
    /**
     * 디테일이 페이지를 넘어가는 경우 디테일밴드 헤더를 출력할 지 여부.
     * 디테일밴드에 지정.
     */
    get repeatDetailHeader(): boolean;
    set repeatDetailHeader(value: boolean);
    /**
     * 디테일이 페이지를 넘어가는 경우 디테일밴드 푸터를 출력할 지 여부.
     * 디테일밴드에 지정.
     */
    get repeatDetailFooter(): boolean;
    set repeatDetailFooter(value: boolean);
    /**
     * true면 데이터행 없이 footer만 표시되는 경우에도 header를 표시한다.
     */
    get alwaysHeader(): boolean;
    set alwaysHeader(value: boolean);
    /**
     * summary runtime
     */
    get summaryRuntime(): DataBandSummaryRuntime;
    prepareIndices(ctx: PrintContext): void;
    protected abstract _doPrepareIndices(ctx: PrintContext): void;
    getColPoints(w: number, x?: number): number[];
    getColWidth(w: number): number;
    getValues(ctx: PrintContext, row: number, fields: string[]): any[];
    protected _selectRow(data: IBandData, row: number, idx: number): boolean;
    abstract getNextDetailRows(ctx: PrintContext): number[];
    protected _getNextDetailRows(ctx: PrintContext, from: number): number[];
    abstract skipDetailRows(ctx: PrintContext): void;
    protected _skipDetailRows(ctx: PrintContext, from: number): number;
    getRowsPerPage(): {
        rowsPerPage: number;
        breakRowsPerPage: boolean;
    };
    getEndRowCount(endMessage?: number): {
        endRowCount: number;
        stopEndRow: boolean;
    };
    getCount(field: string, count: number, rows?: number[]): number;
    getVCount(field: string, count: number, rows?: number[]): number;
    getSum(field: string, count: number, rows?: number[]): number;
    getMin(field: string, count: number, rows?: number[]): number;
    getMax(field: string, count: number, rows?: number[]): number;
    getAvg(field: string, count: number, rows?: number[]): number;
    get designLevel(): number;
    get dataDominant(): boolean;
    protected _getEditProps(): IPropInfo[];
    protected _getStyleProps(): string[];
    canAddTo(group: ReportGroupItem): boolean;
    canResize(dir: ResizeDirection): boolean;
    canPageBreak(): boolean;
    protected _doLoad(loader: IReportLoader, src: any): void;
    protected _doSave(target: object): void;
    protected _doPreparePrint(ctx: PrintContext): void;
    clearSummary(): void;
    /**
     * @Test
     */
    testPrepare(data: IBandData): void;
    private $_getSummary;
    private $_calcSummary;
    private $_getVCount;
    private $_getSum;
    private $_getMin;
    private $_getMax;
}
/**
 */
declare class DataBandCollection extends ReportGroupItem {
    static readonly PROPINFOS: IPropInfo[];
    private _owner;
    private _label;
    constructor(owner: DataBand, label: string);
    /** owner */
    get owner(): DataBand;
    getSaveType(): string;
    get outlineLabel(): string;
    get designLevel(): number;
    get marqueeParent(): ReportItem;
    canAdd(item: ReportItem): boolean;
    canContainsBand(): boolean;
    protected _doItemAdded(item: ReportItem, index: number): void;
}

declare class TableBandColumn extends TableColumnBase {
    constructor(collection: TableBandColumnCollection, src?: any);
    getCollectionLabel(): string;
    /** band */
    get band(): TableBand;
    get displayPath(): string;
    get collection(): TableBandColumnCollection;
    get marqueeParent(): ReportItem;
    isAncestor(group: ReportGroupItem): boolean;
    canRemoveFrom(): boolean;
    protected _changed(prop: string, newValue: any, oldValue: any): void;
}
declare class TableBandColumnCollection extends TableColumnCollectionBase<TableBand, TableBandColumn> {
    constructor(band?: TableBand);
    /** band */
    get band(): TableBand;
    protected _createColumn(src: any): TableBandColumn;
}
/**
 * TableBand의 셀 모델.
 * span할 수 있다.
 * 자식 하나만 가질 수 있다.
 */
declare class TableBandCellItem extends TableCellItem {
    static readonly $_ctor: string;
    constructor(item: ReportItem);
}
/**
 * TableBand의 행 영역 모델.
 * TableBandCellItem들로 구성된다.
 * field item들은 TableBand에 설정된 file item 설정에 따라 자동으로 추가한다.(?)
 */
declare abstract class TableBandSection extends TableBase {
    static readonly PROP_LINES = "lines";
    static readonly STYLE_PROPS: string[];
    static readonly DEFAULT_ROWS = 1;
    private _band;
    /** @internal */
    removedCells: TableCell[];
    constructor(band: TableBand);
    /** band */
    get band(): TableBand;
    protected _getStyleProps(): string[];
    needDesignWidth(): boolean;
    needDesignHeight(): boolean;
    canResize(dir: ResizeDirection): boolean;
    get marqueeParent(): ReportItem;
    get colCount(): number;
    getColumn(col: number): TableColumnBase;
    getCellWidths(): DimensionCollection;
    protected _createCell(item: ReportItem): TableBandCellItem;
    isAncestorOf(item: ReportPageItem): boolean;
}
declare class TableBandHeader extends TableBandSection {
    static readonly PROP_TABLE_BAND_HEADER_REPEAT = "repeat";
    static readonly $_ctor: string;
    private _repeat;
    private _pageSection;
    constructor(band: TableBand, pageSection?: boolean);
    /** repeat */
    get repeat(): boolean;
    set repeat(value: boolean);
    get outlineLabel(): string;
    get pathLabel(): string;
}
declare class TableBandFooter extends TableBandSection {
    static readonly PROP_ATTACH_TO_BODY = "attachToBody";
    static readonly PROPINFOS: IPropInfo[];
    static readonly $_ctor: string;
    private _attachToBody;
    private _pageSection;
    constructor(band: TableBand, pageSection?: boolean);
    /**
     * true면 multi column 모드일 때 마지막 컬럼의 마지막 행에 붙여서 출력하고,
     * false면 모든 컬럼의 가장 아래쪽에 붙여서 출력한다.
     *
     * @default false
     */
    get attachToBody(): boolean;
    set attachToBody(value: boolean);
    get outlineLabel(): string;
    get pathLabel(): string;
    protected _getEditProps(): IPropInfo[];
    protected _doLoad(loader: IReportLoader, src: any): void;
    protected _doSave(target: object): void;
}
/**
 * Data row template in table band.
 * 하나 이상의 table row로 구성할 수 있다.
 */
declare class TableBandDataRow extends TableBandSection {
    static readonly PROP_EQUAL_BLANK = "equalBlank";
    static readonly PROP_BLANK_FIELDS = "blankFields";
    static readonly PROP_MERGED_IN_GROUP = "mergedInGroup";
    static readonly CHILD_PROPS: IPropInfo[];
    static readonly $_ctor: string;
    private _blankItems;
    masterRow: number;
    get blankItems(): ReportItem[];
    canBlank(item: ReportItem, row: number): boolean;
    getMergedColumns(): number[];
    getMergedCells(): TableCell[];
    get outlineLabel(): string;
    get pathLabel(): string;
    get dataDominant(): boolean;
    get isDataRowContainer(): boolean;
    protected _createCells(): TableCellCollection;
    protected _getChildPropInfos(item: ReportItem): IPropInfo[];
    protected _doLoadChild(child: ReportItem, src: any): void;
    protected _doPreparePrint(ctx: PrintContext): void;
    private $_collectBlankItems;
}
declare class TableBandRowGroupSection extends TableBase {
    static readonly STYLE_PROPS: string[];
    static readonly DEFAULT_ROWS = 1;
    private _group;
    /** @internal */
    removedCells: TableCell[];
    constructor(group: TableBandRowGroup, name: string);
    /** group */
    get group(): TableBandRowGroup;
    /** band */
    get band(): TableBand;
    protected _getStyleProps(): string[];
    needDesignHeight(): boolean;
    needDesignWidth(): boolean;
    canResize(dir: ResizeDirection): boolean;
    get marqueeParent(): ReportItem;
    get colCount(): number;
    getColumn(col: number): TableColumnBase;
    getCellWidths(): DimensionCollection;
    protected _createCell(item: ReportItem): TableCellItem;
    isAncestorOf(item: ReportPageItem): boolean;
}
declare class TableBandRowGroupHeader extends TableBandRowGroupSection {
    static readonly $_ctor: string;
    constructor(group: TableBandRowGroup);
    get outlineLabel(): string;
    get pathLabel(): string;
}
declare class TableBandRowGroupFooter extends TableBandRowGroupSection {
    static readonly PROP_MERGED = "merged";
    static readonly PROPINFOS: IPropInfo[];
    static readonly $_ctor: string;
    private _merged;
    constructor(group: TableBandRowGroup);
    /**
     * True면 병합 컬럼에 포함되는 셀은 병합 데이터셀에 포함시킨다.
     */
    get merged(): boolean;
    set merged(value: boolean);
    get outlineLabel(): string;
    get pathLabel(): string;
    getEditProps(): IPropInfo[];
    protected _doLoad(loader: IReportLoader, src: any): void;
    protected _doSave(target: object): void;
}
declare class TableBandRowGroup extends DataBandRowGroup {
    static readonly PROPINFOS: IPropInfo[];
    private _merged;
    private _collection;
    private _header;
    private _footer;
    constructor(collection: TableBandRowGroupCollection);
    get outlineParent(): IOutlineSource;
    get marqueeParent(): ReportItem;
    getEditProps(): IPropInfo[];
    getCollectionLabel(): string;
    /** header */
    get header(): TableBandRowGroupHeader;
    /** footer */
    get footer(): TableBandRowGroupFooter;
    /** band */
    get band(): TableBand;
    get page(): ReportPage;
    get report(): Report;
    get collection(): TableBandRowGroupCollection;
    get dataParent(): ReportGroupItem;
    get outlineLabel(): string;
    get displayPath(): string;
    protected _ignoreItems(): boolean;
    protected _doLoad(loader: IReportLoader, src: any): void;
    protected _doSave(target: object): void;
    protected _changed(prop: string, newValue: any, oldValue: any): void;
}
declare class TableBandRowGroupCollection extends ReportItemCollection<TableBandRowGroup> {
    private _band;
    private _groups;
    constructor(band?: TableBand);
    get outlineParent(): IOutlineSource;
    get outlineLabel(): string;
    get outlineExpandable(): boolean;
    get outlineItems(): IOutlineSource[];
    getSaveType(): string;
    /** band */
    get band(): TableBand;
    /** count */
    get count(): number;
    get items(): ReportPageItem[];
    get visibleCount(): number;
    /** groups */
    get groups(): TableBandRowGroup[];
    load(loader: IReportLoader, src: any): void;
    save(target: any): void;
    get(index: number): TableBandRowGroup;
    indexOf(group: TableBandRowGroup): number;
    add(group: TableBandRowGroup | ConfigObject, index?: number): TableBandRowGroup;
    addAll(groups: (TableBandRowGroup | ConfigObject)[], index?: number): boolean;
    removeAt(index: number): boolean;
    remove(group: TableBandRowGroup): boolean;
    clear(): boolean;
    getValidGroups(data: IBandData): TableBandRowGroup[];
    get page(): ReportPage;
    get displayPath(): string;
    get level(): number;
    isAncestorOf(item: ReportPageItem): boolean;
    private $_add;
    private $_invalidateGroups;
    private $_groupChanged;
}
/**
 * 페이지를 넘어갈 수 있다.
 * 한 row는 페이지를 넘어갈 수 없다.
 * header/footer와 row의 컬럼 너비를 반드시 맞춰야 하거나 컬럼 line을 표시해야 할 경우 사용.
 * header/footer/pageFooter 각 컬럼의 너비는 row의 컬럼 너비를 자동으로 따라간다.
 * design-time에는 section마다 별도의 table로 표시되지만 printing 시에는 하나의 table element로 구현한다.
 */
declare class TableBand extends DataBand {
    static readonly PROP_COL_COUNT = "colCount";
    static readonly PROP_COLUMNS = "columns";
    static readonly PROP_GROUPS = "groups";
    static readonly PROPINFOS: IPropInfo[];
    static readonly DEFAULT_COL_COUNT = 5;
    static readonly $_ctor: string;
    static readonly ITEM_TYPE = "Table Band";
    private _colCount;
    private _columns;
    private _groups;
    private _header;
    private _footer;
    private _dataRow;
    private _tables;
    private _pr;
    private _tr;
    private _lastTrs;
    constructor(name: string);
    get outlineItems(): IOutlineSource[];
    /** cols */
    get colCount(): number;
    set colCount(value: number);
    /** columns */
    get columns(): TableBandColumnCollection;
    /** groups */
    get groups(): TableBandRowGroupCollection;
    /** header */
    get header(): TableBandHeader;
    /** footer */
    get footer(): TableBandFooter;
    /** dataRow */
    get dataRow(): TableBandDataRow;
    /**
     * Current printing data row index.
     */
    get pr(): number;
    /**
     * Current printing table row index.
     */
    get tr(): number;
    /**
     * Last printing tr count.
     */
    get lastTrs(): number;
    getColumn(index: number): TableBandColumn;
    getGroup(index: number): TableBandRowGroup;
    /**
     * @internal
     */
    getTables(): TableBase[];
    removeColumn(col: number | TableBandColumn): void;
    addColumn(index: number, column: TableBandColumn): TableBandColumn;
    canMoveColumns(col: number, count: number, newCol: number, alert?: boolean): boolean;
    getNearestMovableColumn(col: number, count: number, delta: number): number;
    moveColumns(col: number, count: number, delta: number, force?: boolean): boolean;
    getCellWidths(): DimensionCollection;
    setPrinting(ctx: PrintContext, pr: number, trows?: number): void;
    getSaveType(): string;
    get outlineLabel(): string;
    get isBand(): boolean;
    protected _ignoreItems(): boolean;
    protected _valueable(): boolean;
    protected _getEditProps(): IPropInfo[];
    protected _doDefaultInit(loader: IReportLoader, parent: ReportGroupItem, hintWidth: number, hintHeight: number): void;
    isAncestorOf(item: ReportPageItem): boolean;
    protected _doLoad(loader: IReportLoader, src: any): void;
    protected _doSave(target: object): void;
    private $_columnChanged;
    private $_groupChanged;
    protected _doPreparePrint(ctx: PrintContext): void;
    protected _doPrepareIndices(ctx: PrintContext): void;
    remove(item: ReportPageItem): void;
    getNextDetailRows(ctx: PrintContext): number[];
    skipDetailRows(ctx: PrintContext): void;
}

declare class TableColumn extends TableColumnBase {
    constructor(collection: TableColumnCollection, src?: any);
    /** table */
    get table(): TableContainer;
    get displayPath(): string;
    get collection(): TableColumnCollection;
    get marqueeParent(): ReportItem;
    isAncestor(group: ReportGroupItem): boolean;
    canRemoveFrom(): boolean;
    protected _changed(prop: string, newValue: any, oldValue: any): void;
}
declare class TableColumnCollection extends TableColumnCollectionBase<TableContainer, TableColumn> {
    constructor(table?: TableContainer);
    /** table */
    get table(): TableContainer;
    protected _createColumn(src: any): TableColumn;
}
/**
 * TableContainer가 자동 생성한다.
 * 자식 하나만 가질 수 있다.
 */
declare class TableContainerCellItem extends TableCellItem {
    static readonly $_ctor: string;
    constructor(item: ReportItem);
    get pathLabel(): string;
}
/**
 * 자식 item들을 TableCellItem에 추가해서 배치한다.
 * 페이지를 넘어갈 수 없다.
 */
declare class TableContainer extends TableBase {
    static readonly PROP_BASE_TABLE = "baseTable";
    static readonly PROP_COL_COUNT = "colCount";
    static readonly PROP_COLUMNS = "columns";
    static readonly PROPINFOS: IPropInfo[];
    static readonly DEFAULT_ROW_COUNT = 4;
    static readonly DEFAULT_COL_COUNT = 4;
    static readonly $_ctor: string;
    static readonly ITEM_TYPE = "Table";
    private _baseTable;
    private _colCount;
    private _baseContainer;
    private _columns;
    constructor(name: string);
    changeColumnWidth(col: number, delta: number): void;
    getColumnWidth(col: number): ValueString;
    get outlineItems(): IOutlineSource[];
    /**
     * 기준 table의 name.
     * 기준 table의 cell 너비 설정을 따라간다.
     */
    get baseTable(): string;
    set baseTable(value: string);
    /** cols */
    get colCount(): number;
    set colCount(value: number);
    /** columns */
    get columns(): TableColumnCollection;
    getColumn(index: number): TableColumn;
    removeColumn(col: number | TableColumn): void;
    addColumn(index: number, column: TableColumn): TableColumn;
    canMoveColumns(col: number, count: number, newCol: number, alert?: boolean): boolean;
    moveColumns(col: number, count: number, newCol: number, force?: boolean): boolean;
    getSaveType(): string;
    get outlineLabel(): string;
    get pathLabel(): string;
    needDesignWidth(): boolean;
    needDesignHeight(): boolean;
    protected _datable(): boolean;
    protected _getEditProps(): IPropInfo[];
    protected _doDefaultInit(loader: IReportLoader, parent: ReportGroupItem, hintWidth: number, hintHeight: number): void;
    protected _doLoad(loader: IReportLoader, src: any): void;
    protected _doLoadChild(child: ReportItem, src: any): void;
    protected _doSave(target: object): void;
    protected _createCell(item: ReportItem): TableContainerCellItem;
    getCellWidths(): DimensionCollection;
    prepareLayout(): TableCellSpan[][];
    private $_columnChanged;
}

declare abstract class SimpleBandSection extends StackContainer {
    static readonly PROP_SIMPLE_BAND_SECTION_REPEAT = "repeat";
    static readonly PROPINFOS: IPropInfo[];
    static readonly PROP_FIELD = "field";
    private _repeat;
    private _child_field;
    private _band;
    constructor(band: SimpleBand);
    /** band */
    get band(): SimpleBand;
    /** repeat */
    get repeat(): boolean;
    set repeat(value: boolean);
    /**
     * field
     */
    getFieldOf(item: ReportItem): string;
    setFieldOf(item: ReportItem, value: string): void;
    get designLevel(): number;
    get marqueeParent(): ReportItem;
    protected _getStyleProps(): string[];
    canResize(dir: ResizeDirection): boolean;
    protected _doLoad(loader: IReportLoader, src: any): void;
    protected _doSave(target: object): void;
    protected _doLoadChild(child: ReportItem, src: any): void;
}
declare class SimpleBandHeader extends SimpleBandSection {
    static readonly $_ctor: string;
    constructor(band: SimpleBand);
    get outlineLabel(): string;
}
declare class SimpleBandFooter extends SimpleBandSection {
    static readonly PROP_ATTACH_TO_BODY = "attachToBody";
    static readonly PROPINFOS: IPropInfo[];
    static readonly $_ctor: string;
    private _attachToBody;
    /**
     * true면 multi column 모드일 때 마지막 컬럼의 마지막 행에 붙여서 출력하고,
     * false면 모든 컬럼의 가장 아래쪽에 붙여서 출력한다.
     *
     * @default false
     */
    get attachToBody(): boolean;
    set attachToBody(value: boolean);
    get outlineLabel(): string;
    protected _getEditProps(): IPropInfo[];
    protected _doLoad(loader: IReportLoader, src: any): void;
    protected _doSave(target: object): void;
}
declare class SimpleBandRow extends SimpleBandSection {
    static readonly PROP_EQUAL_BLANK = "equalBlank";
    static readonly PROP_BLANK_FIELDS = "blankFields";
    static readonly CHILD_PROPS: IPropInfo[];
    static readonly $_ctor: string;
    private _blankItems;
    masterRow: number;
    get blankItems(): ReportItem[];
    canBlank(item: ReportItem, row: number): boolean;
    get outlineLabel(): string;
    get dataDominant(): boolean;
    get isDataRowContainer(): boolean;
    protected _getChildPropInfos(item: ReportItem): IPropInfo[];
    protected _doLoadChild(child: ReportItem, src: any): void;
    protected _doPreparePrint(ctx: PrintContext): void;
}
declare abstract class SimpleBandRowGroupSection extends StackContainer {
    static readonly STYLE_PROPS: string[];
    private _group;
    constructor(group: SimpleBandRowGroup, name: string);
    /** group */
    get group(): SimpleBandRowGroup;
    /** band */
    get band(): SimpleBand;
}
declare class SimpleBandRowGroupHeader extends SimpleBandRowGroupSection {
    static readonly $_ctor: string;
    constructor(group: SimpleBandRowGroup);
    get outlineLabel(): string;
}
declare class SimpleBandRowGroupFooter extends SimpleBandRowGroupSection {
    static readonly $_ctor: string;
    constructor(group: SimpleBandRowGroup);
    get outlineLabel(): string;
}
declare class SimpleBandRowGroup extends DataBandRowGroup {
    static readonly PROPINFOS: IPropInfo[];
    private _collection;
    private _header;
    private _footer;
    constructor(collection: SimpleBandRowGroupCollection);
    get outlineParent(): IOutlineSource;
    get marqueeParent(): ReportItem;
    getEditProps(): IPropInfo[];
    /** header */
    get header(): SimpleBandRowGroupHeader;
    /** footer */
    get footer(): SimpleBandRowGroupFooter;
    /** band */
    get band(): SimpleBand;
    get page(): ReportPage;
    get report(): Report;
    get collection(): SimpleBandRowGroupCollection;
    get dataParent(): ReportGroupItem;
    protected _ignoreItems(): boolean;
    protected _doLoad(loader: IReportLoader, src: any): void;
    protected _doSave(target: object): void;
    protected _changed(prop: string, newValue: any, oldValue: any): void;
}
declare class SimpleBandRowGroupCollection extends ReportItemCollection<SimpleBandRowGroup> {
    private _band;
    private _groups;
    constructor(band?: SimpleBand);
    get outlineParent(): IOutlineSource;
    get outlineLabel(): string;
    get outlineExpandable(): boolean;
    get outlineItems(): IOutlineSource[];
    getSaveType(): string;
    canRemoveFrom(): boolean;
    canParentOf(itemType: string): boolean;
    /** band */
    get band(): SimpleBand;
    /** count */
    get count(): number;
    get items(): ReportPageItem[];
    get visibleCount(): number;
    /** groups */
    get groups(): SimpleBandRowGroup[];
    load(loader: IReportLoader, src: any): void;
    save(target: any): void;
    get(index: number): SimpleBandRowGroup;
    indexOf(field: SimpleBandRowGroup): number;
    add(group: SimpleBandRowGroup | ConfigObject, index?: number): SimpleBandRowGroup;
    addAll(groups: (SimpleBandRowGroup | ConfigObject)[], index?: number): boolean;
    removeAt(index: number): boolean;
    remove(group: SimpleBandRowGroup): boolean;
    clear(): boolean;
    getValidGroups(data: IBandData): SimpleBandRowGroup[];
    get page(): ReportPage;
    get displayPath(): string;
    get level(): number;
    isAncestorOf(item: ReportPageItem): boolean;
    private $_add;
    private $_invalidateGroups;
    private $_groupChanged;
}
/**
 * 페이지를 넘어갈 수 있다.
 * 한 row는 페이지를 넘어갈 수 없다.
 * 페이지를 넘어갈 수 있으므로 매 페이지마다 header나 footer를 표시할 필요가 있을 수 있다.
 */
declare class SimpleBand extends DataBand {
    static readonly PROP_SIMPLE_BAND_GROUPS = "groups";
    static readonly PROPINFOS: IPropInfo[];
    static readonly $_ctor: string;
    static readonly ITEM_TYPE = "Simple Band";
    private _groups;
    private _header;
    private _footer;
    private _dataRow;
    private _pr;
    constructor(name: string);
    get outlineItems(): IOutlineSource[];
    /** groups */
    get groups(): SimpleBandRowGroupCollection;
    /** header */
    get header(): SimpleBandHeader;
    /** footer */
    get footer(): SimpleBandFooter;
    /** dataRow */
    get dataRow(): SimpleBandRow;
    /**
     * Current printing data row
     */
    get pr(): number;
    setPrinting(ctx: PrintContext, row: number): void;
    getSaveType(): string;
    get outlineLabel(): string;
    get isBand(): boolean;
    protected _valueable(): boolean;
    protected _ignoreItems(): boolean;
    protected _getEditProps(): IPropInfo[];
    isAncestorOf(item: ReportPageItem): boolean;
    protected _doLoad(loader: IReportLoader, src: any): void;
    protected _doSave(target: object): void;
    private $_groupChanged;
    protected _doPreparePrint(ctx: PrintContext): void;
    protected _doPrepareIndices(ctx: PrintContext): void;
    canRemove(item: ReportItem): boolean;
    getNextDetailRows(ctx: PrintContext): number[];
    skipDetailRows(ctx: PrintContext): void;
}

/**
 * Box container 내에서 아이템들 사이에 일정 크기의 자리를 차지하는 place holder 아이템.
 * 대개는 비어 있는 상태이지만, border 스타일을 이용해 수직/수평 선을 표시하는 용도로 사용할 수 있다.
 * 페이지를 넘어갈 수 없다.
 */
declare class SpaceItem extends ReportItem {
    static readonly PROP_SIZE = "size";
    static readonly PROPINFOS: IPropInfo[];
    static readonly $_ctor: string;
    static readonly ITEM_TYPE = "Space";
    private _size;
    private _sizeDim;
    constructor(name: string);
    /**
     * 높이나 너비.
     * RowBoxContainer 안에서는 너비.
     * ColumnBoxContainer 안에서는 높이.
     */
    get size(): ValueString;
    set size(value: ValueString);
    getSize(domain: number): number;
    getSaveType(): string;
    get outlineLabel(): string;
    protected _sizable(): boolean;
    protected _boundable(): boolean;
    protected _getEditProps(): IPropInfo[];
    protected _doDefaultInit(loader: IReportLoader, parent: ReportGroupItem, hintWidth: number, hintHeight: number): void;
    protected _doLoad(loader: IReportLoader, src: any): void;
    protected _doSave(target: object): void;
    canAddTo(parent: ReportGroupItem): boolean;
    private $_getParentItem;
}

interface IImageContainer {
    addImage(url: string): void;
    imageLoaded(url: string): void;
}
/** @internal */
declare class ReportElement extends VisualElement {
    private static readonly Debugging;
    private _debugView;
    protected _modelWidth: number;
    protected _modelHeight: number;
    private _measuredWidth;
    private _measuredHeight;
    protected _printWidth: number;
    protected _printHeight: number;
    constructor(doc: Document, name: string);
    protected _doDispose(): void;
    /** debuggin */
    get debugging(): boolean;
    /** debugName */
    get debugLabel(): string;
    /** guardLabel */
    get guardLabel(): string;
    /** measuredWidth */
    get measuredWidth(): number;
    /** measuredHeight */
    get measuredHeight(): number;
    /**
     * true면 measure() 시점이 아니라
     * layout() 시점에 parent의 크기를 기준으로 measure + layout을 동시 진행한다.
     */
    get lazyLayout(): boolean;
    get floating(): boolean;
    measure(ctx: PrintContext, hintWidth: number, hintHeight: number): Size;
    layoutContent(ctx: PrintContext): void;
    print(doc: Document, ctx: PrintContext, w?: number): number;
    findElement(modelName: string): ReportItemElement<ReportItem>;
    applyMeasure(): void;
    protected _doDraw(dom: HTMLElement): void;
    protected _debugBorder(): string;
    protected _debugColor(): string;
    protected _clearDesign(): void;
    protected _afterDraw(dom: HTMLElement): void;
    protected _debuggable(): boolean;
    protected _doPrepareMeasure(ctx: PrintContext, dom: HTMLElement): void;
    protected _doAfterMeasure(ctx: PrintContext, dom: HTMLElement, hintWidth: number, hintHeight: number, sz: Size): void;
    protected _doMeasure(ctx: PrintContext, dom: HTMLElement, hintWidth: number, hintHeight: number): Size;
    protected _doPrepareContent(ctx: PrintContext): void;
    protected _doLayoutContent(ctx: PrintContext): void;
    protected _doAfterLayout(ctx: PrintContext): void;
    protected _doSetStyles(model: ReportItem, dom: HTMLElement): void;
    protected _setStyles(model: ReportItem, styles: {
        [key: string]: string;
    }, css: CSSStyleDeclaration): void;
    protected _getModelWidth(model: ReportItem, width: number): number;
    protected _getModelHeight(model: ReportItem, height: number): number;
    protected _setModelSize(model: ReportItem, dom: HTMLElement, width: number, height: number, clear?: boolean): void;
    protected _doPrint(doc: Document, ctx: PrintContext): void;
}

/** @internal */
declare abstract class ReportItemElement<T extends ReportItem> extends ReportElement {
    protected _designView: HTMLDivElement;
    protected _bindMarker: HTMLSpanElement;
    private _model;
    protected _modelChanged: boolean;
    private _prevStyles;
    constructor(doc: Document, model?: T, name?: string);
    protected _doDispose(): void;
    /** model */
    get model(): T;
    set model(value: T);
    /** navigableParent */
    get navigableParent(): ReportGroupItemView;
    get modelParent(): ReportGroupItemView;
    get marqueeParent(): ReportItemView;
    get designable(): boolean;
    get editable(): boolean;
    get isSpace(): boolean;
    get isRelativeHeight(): boolean;
    _clearDesign(): void;
    getEditText(): string;
    setEditText(report: Report, text: string): void;
    refreshPrintValues(ctx: PrintContext): void;
    get printable(): boolean;
    protected _initDom(doc: Document, dom: HTMLElement): void;
    protected _setBindMarker(visible?: boolean, system?: boolean): void;
    protected _doPrepareMeasure(ctx: PrintContext, dom: HTMLElement): void;
    protected _doAfterMeasure(ctx: PrintContext, dom: HTMLElement, hintWidth: number, hintHeight: number, sz: Size): void;
    findElement(modelName: string): ReportItemElement<ReportItem>;
    findElementOf(dom: HTMLElement): ReportItemElement<ReportItem>;
    getPrintValue(ctx: PrintContext, m: ReportItem, defaultValue?: any): any;
    protected _doModelChanged(oldModel: T): void;
    protected _setX(dom: HTMLElement, x: number): void;
    protected _setY(dom: HTMLElement, y: number): void;
    protected _setPos(dom: HTMLElement, x: number, y: number): void;
    protected _runValueCallback(ctx: PrintContext, m: ReportItem, value: any): any;
}
declare type ReportItemView = ReportItemElement<ReportItem>;
/** @internal */
declare abstract class ReportGroupItemElement<T extends ReportGroupItem> extends ReportItemElement<T> {
    private _contentBox;
    private _floatings;
    private _padLeft;
    private _padRight;
    private _padTop;
    private _padBottom;
    private _borderApplied;
    measureFixed: boolean;
    constructor(doc: Document, model: T, name: string);
    protected _doDispose(): void;
    get navigable(): boolean;
    isContentDom(dom: HTMLElement): boolean;
    findElement(modelName: string): ReportItemView;
    findElementOf(dom: HTMLElement): ReportItemView;
    getElementOf(model: ReportItem): ReportItemView;
    indexOfElement(elt: ReportItemView): number;
    getLeaves(): ReportItemView[];
    getFirst(): ReportItemView;
    getLast(): ReportItemView;
    protected _getPrev(item: ReportItemView): ReportItemView;
    protected _getNext(item: ReportItemView): ReportItemView;
    getPrev(item: ReportItemView): ReportItemView;
    getNext(item: ReportItemView): ReportItemView;
    getLeft(item: ReportItemView): ReportItemView;
    getRight(item: ReportItemView): ReportItemView;
    getUpper(item: ReportItemView): ReportItemView;
    getLower(item: ReportItemView): ReportItemView;
    itemOfDom(dom: Element): ReportItem;
    setFixedSize(w: number): ReportGroupItemElement<ReportGroupItem>;
    isDom(dom: Element): boolean;
    protected _initDom(doc: Document, dom: HTMLElement): void;
    replaceDom(dom: HTMLElement): void;
    refreshPrintValues(ctx: PrintContext): void;
    protected _getItemViews(): ReportItemView[];
    protected _getParentDom(): HTMLElement;
    protected _getItemsParent(): ReportElement;
    protected _needContentBox(): boolean;
    protected _needDesignBox(): boolean;
    protected _applyPaddings(dom: HTMLElement, sz: Size): void;
    protected _applyBorders(dom: HTMLElement, sz: Size): void;
    protected _isEmpty(): boolean;
    protected _isFocused(): boolean;
    protected _isItemFocused(item: ReportPageItem): boolean;
    protected _isItemSelected(item: ReportPageItem): boolean;
    protected _getFocusedItem(): ReportPageItem;
    protected _doMeasure(ctx: PrintContext, dom: HTMLElement, hintWidth: number, hintHeight: number): Size;
    protected _doPrepareMeasure(ctx: PrintContext, dom: HTMLElement): void;
    protected _getDesignText(): string;
    protected _setDesignContent(empty: boolean): void;
    protected _doMeasureItem(ctx: PrintContext, elt: ReportElement, hintWidth: number, hintHeight: number): void;
    protected _createElement(report: ReportView, parent: ReportElement, item: ReportItem): ReportElement;
    protected _buildItems(ctx: PrintContext, report: ReportView, model: ReportGroupItem): void;
    protected _prepareChild(child: ReportElement): void;
    protected _doLayoutContent(ctx: PrintContext): void;
    layoutFloating(ctx: PrintContext): void;
    protected _layoutItem(ctx: PrintContext, child: ReportElement, model: ReportItem, x: number, y: number, width: number, height: number): void;
    protected _layoutChild(ctx: PrintContext, child: ReportElement, x: number, y: number, width: number, height: number): void;
    protected _layoutFloating(ctx: PrintContext, child: ReportElement, model: FloatingContainer): void;
    protected _doAfterLayout(ctx: PrintContext): void;
    protected _doPrint(doc: Document, ctx: PrintContext): void;
}
declare type ReportGroupItemView = ReportGroupItemElement<ReportGroupItem>;
interface ITable {
    colCount: number;
    columns: TableColumnCollectionBase<ReportGroupItem, TableColumnBase>;
    getColumn(index: number): TableColumnBase;
    getColPoints(): number[];
}

declare enum PaperSize {
    A0 = "A0",
    A1 = "A1",
    A2 = "A2",
    A3 = "A3",
    A4 = "A4",
    A5 = "A5",
    A6 = "A6",
    A7 = "A7",
    A8 = "A8"
}
declare enum PaperOrientation {
    PORTRAIT = "portrait",
    LANDSCAPE = "landscape"
}
/**
 * Paper options
 */
declare class PaperOptions extends Base {
    private _orientation;
    private _size;
    private _width;
    private _height;
    private _marginLeft;
    private _marginRight;
    private _marginTop;
    private _marginBottom;
    private _report;
    private _widthDim;
    private _heightDim;
    private _marginLeftDim;
    private _marginRightDim;
    private _marginTopDim;
    private _marginBottomDim;
    constructor(report: Report);
    protected _doDispose(): void;
    /** orientation */
    get orientation(): PaperOrientation;
    set orientation(value: PaperOrientation);
    /** size */
    get size(): PaperSize;
    set size(value: PaperSize);
    /** width */
    get width(): ValueString;
    set width(value: ValueString);
    /** height */
    get height(): ValueString;
    set height(value: ValueString);
    /** marginLeft */
    get marginLeft(): ValueString;
    set marginLeft(value: ValueString);
    /** marginRight */
    get marginRight(): ValueString;
    set marginRight(value: ValueString);
    /** marginTop */
    get marginTop(): ValueString;
    set marginTop(value: ValueString);
    /** marginBottom */
    get marginBottom(): ValueString;
    set marginBottom(value: ValueString);
    load(src: any): void;
    getPageSize(): Size;
    getContentRect(r: Rectangle): Rectangle;
    getClientRect(): Rectangle;
    applyExtents(css: CSSStyleDeclaration): void;
    applyPreviewExtents(css: CSSStyleDeclaration): void;
    applyClient(css: CSSStyleDeclaration): void;
    applyPreviewClient(css: CSSStyleDeclaration): void;
    protected _changed(): void;
}
/**
 * Report info.
 */
declare class ReportInfo extends Base {
    name: string;
    author: string;
    version: string;
    created: Date;
    description: string;
    paper: PaperOptions;
    constructor(report: Report);
}
/**
 * Find result
 */
interface FindResult {
    item: ReportItem;
    prop: string;
}
declare class ReportRootItem extends ReportGroupItem {
    static readonly PROP_REPORT_NAME = "name";
    static readonly PROP_REPORT_AUTHOR = "author";
    static readonly PROP_REPORT_VERSION = "version";
    static readonly PROP_REPORT_DESCRIPTION = "description";
    static readonly PROP_PAPER_ORIENTATION = "paperOrientation";
    static readonly PROP_PAPER_SIZE = "paperSize";
    static readonly PROP_PAPER_WIDTH = "paperWidth";
    static readonly PROP_PAPER_HEIGHT = "paperHeight";
    static readonly PROP_MARGIN_LEFT = "marginLeft";
    static readonly PROP_MARGIN_RIGHT = "marginRight";
    static readonly PROP_MARGIN_TOP = "marginTop";
    static readonly PROP_MARGIN_BOTTOM = "marginBottom";
    static readonly PROPINFOS: IPropInfo[];
    static readonly $_ctor: string;
    private _report;
    constructor(report: Report);
    get report(): Report;
    /** name */
    get name(): string;
    set name(value: string);
    /** author */
    get author(): string;
    set author(value: string);
    /** version */
    get version(): string;
    set version(value: string);
    /** description */
    get description(): string;
    set description(value: string);
    /** paperOrientation */
    get paperOrientation(): PaperOrientation;
    set paperOrientation(value: PaperOrientation);
    /** paperSize */
    get paperSize(): PaperSize;
    set paperSize(value: PaperSize);
    /** paperWidth */
    get paperWidth(): ValueString;
    set paperWidth(value: ValueString);
    /** paperHeight */
    get paperHeight(): ValueString;
    set paperHeight(value: ValueString);
    /** marginLeft */
    get marginLeft(): ValueString;
    set marginLeft(value: ValueString);
    /** marginRight */
    get marginRight(): ValueString;
    set marginRight(value: ValueString);
    /** marginTop */
    get marginTop(): ValueString;
    set marginTop(value: ValueString);
    /** marginBottom */
    get marginBottom(): ValueString;
    set marginBottom(value: ValueString);
    get pathLabel(): string;
    get displayPath(): string;
    protected _ignoreItems(): boolean;
    getEditProps(): IPropInfo[];
    getStyleProps(): IPropInfo[];
    canResize(dir: ResizeDirection): boolean;
    protected _doLoad(loader: IReportLoader, src: any): void;
    protected _doSave(target: object): void;
}
/**
 * Report model.
 */
declare class Report extends EventAware implements IEditCommandStackOwner {
    static readonly RESET = "onReportReset";
    static readonly PAPER_CHANGED = "onReportPaperChanged";
    static readonly ITEM_ADD = "onReportItemAdd";
    static readonly ITEM_ADDED = "onReportItemAdded";
    static readonly ITEMS_ADDED = "onReportItemsAdded";
    static readonly ITEM_REMOVED = "onReportItemRemoved";
    static readonly ITEMS_REMOVED = "onReportItemsRemoved";
    static readonly ITEM_CHANGED = "onReportItemChanged";
    static readonly ITEM_MOVED = "onReportItemMoved";
    static readonly COMMANDS_STACK_CHANGED = "onReportCommandStackChanged";
    static readonly DIRTY_CHANGED = "onReportDirtyChanged";
    static readonly DATA_ADDED = "onReportDataAdded";
    static readonly DATA_REMOVED = "onReportDataRemoved";
    static readonly DATA_UPDATED = "onReportDataUpdated";
    static readonly DATA_NAME_CHANGED = "onReportDataNameChanged";
    static readonly DATA_FIELD_NAME_CHANGED = "onReportDataFieldNameChanged";
    static readonly CELL_MERGED = "onReportCellMerged";
    static readonly ALERT = "onReportAlert";
    static isReportSource(source: any): boolean;
    private _info;
    private _unit;
    private _assetRoot;
    private _root;
    private _page;
    private _assets;
    private _data;
    private _designData;
    designTag: any;
    models: any;
    private _designTime;
    private _loader;
    private _commands;
    private _loading;
    private _invalids;
    constructor(designTime?: boolean, source?: any);
    _doDispose(): void;
    onDesignDataManagerDataAdded(dm: DesignDataManager, data: IReportData): void;
    onDesignDataManagerDataRemoved(dm: DesignDataManager, data: IReportData): void;
    onDesignDataManagerDataUpdated(dm: DesignDataManager, data: IReportData): void;
    onDesignDataManagerNameChanged(dm: DesignDataManager, data: IReportData, oldName: string): void;
    onDesignDataManagerFieldNameChanged(dm: DesignDataManager, data: IReportData, newName: string, oldName: string): void;
    editCommandStackChanged(stack: EditCommandStack, cmd: EditCommand, undoable: boolean, redoable: boolean): void;
    editCommandStackDirtyChanged(stack: EditCommandStack): void;
    /** @internal */
    get loader(): IReportLoader;
    /** info */
    get info(): ReportInfo;
    /** paper */
    get paper(): PaperOptions;
    /** unit */
    get unit(): PrintUnit;
    set unit(value: PrintUnit);
    /** assetRoot */
    get assetRoot(): string;
    set assetRoot(value: string);
    get root(): ReportRootItem;
    /** page */
    get page(): ReportPage;
    set page(value: ReportPage);
    /** assets */
    get assets(): AssetManager;
    /** data */
    get data(): IReportDataProvider;
    /** desingData */
    get designData(): DesignDataManager;
    /** canUndo */
    get canUndo(): boolean;
    /** canRedo */
    get canRedo(): boolean;
    get dirty(): boolean;
    load(src: any): Report;
    setSaveTagging(tag: string): Report;
    save(pageOnly?: boolean): object;
    prepareLayout(): void;
    preparePrint(ctx: PrintContext): void;
    getImageUrl(url: string): string;
    clearHistory(): void;
    closeHistory(): void;
    undo(): boolean;
    redo(): boolean;
    execute(cmd: EditCommand): boolean;
    getEditHistory(all?: boolean): EditCommand[];
    getCommand(id: number): EditCommand;
    itemByName(name: string): ReportItem;
    defaultInit(item: ReportItem, group: ReportGroupItem, hintWidth: number, hintHeight: number): void;
    addItem(parent: ReportGroupItem, item: ReportItem, index?: number): boolean;
    /**
     * 테이블 행을 추가한다.
     *
     * @param table - 테이블 객체. TableContainer 혹은 TableBand 구성 테이블들.
     * @param row - 추가 위치.
     */
    addTableRow(table: TableBase, row: number): void;
    /**
     * 테이블 행들을 이동시킨다.
     *
     * @param table - 테이블 객체. TableContainer 혹은 TableBand 구성 테이블들.
     * @param row - 이동할 시작 행 위치.
     * @param count - 이동할 행 개수.
     * @param delta - 이동 간격. 음수면 위로, 양수면 아래로 이동한다.
     * @param alert - true로 설정하면, 이동 불가능한 상태일 때 예외를 발생시킨다.
     */
    moveTableRows(table: TableBase, row: number, count: number, delta: number, alert?: boolean): void;
    moveTableRowsToNearest(table: TableBase, row: number, count: number, delta: number, alert?: boolean): void;
    /**
     * 테이블이나 테이블밴드에 컬럼을 추가한다.
     * 병함된 셀을 분할해서 이동할 수 없다.
     * 또, 이동 후 병합된 셀을 분할시킬 수 없다.
     *
     * @param table - 테이블 혹은 테이블밴드 객체.
     * @param col - 추가 위치.
     */
    addTableColumn(table: TableContainer | TableBand, col: number): void;
    /**
     * 테이블이나 테이블밴드의 컬럼들을 이동시킨다.
     * 병함된 셀을 분할해서 이동할 수 없다.
     * 또, 이동 후 병합된 셀을 분할시킬 수 없다.
     *
     * @param table - 테이블 혹은 테이블밴드 객체.
     * @param col - 이동할 시작 컬럼 위치.
     * @param count - 이동할 컬럼 개수.
     * @param delta - 이동 간격. 음수면 왼쪽으로, 양수면 오른쪽으로 이동한다.
     */
    moveTableColumns(table: TableContainer | TableBand, col: number, count: number, delta: number): void;
    moveTableColumnsToNearest(table: TableContainer | TableBand, col: number, count: number, delta: number): void;
    /**
     * 리포트 아이템을 제거한다.
     *
     * @param item - 제거할 리포트 아이템 객체.
     */
    removeItem(item: ReportPageItem): void;
    /**
     * 리포트 아이템들을 제거한다.
     *
     * @param items - 제거할 리포트 아이템 객체들의 배열.
     */
    removeItems(items: ReportPageItem[]): void;
    setItemProperty(item: ReportPageItem, prop: string, value: any): void;
    setItemProperties(item: ReportPageItem, props: ConfigObject): void;
    setItemsProperties(items: ReportItem[], props: ConfigObject): void;
    resetItemProperty(item: ReportPageItem, prop: IPropInfo): boolean;
    setItemsProperty(items: ReportPageItem[], prop: string, value: any): void;
    setItemStyle(item: ReportPageItem, style: string, value: any): void;
    setItemsStyle(items: ReportPageItem[], style: string, value: any): void;
    setChildStyleProperty(item: ReportItem, prop: string, style: string, value: any): void;
    setItemsChildStyleProperty(items: ReportItem[], prop: string, style: string, value: any): void;
    addTableBandColumn(band: TableBand, config: any, index?: number): void;
    addTableBandGroup(band: TableBand, config: any, index?: number): void;
    addSimpleBandGroup(band: SimpleBand, config: any, index?: number): void;
    canMergeSelection(selection: ISelectionSource): boolean;
    mergeSelection(selection: TableSelection): void;
    canUnmergeCell(cell: TableCell): boolean;
    unmergeCell(cell: TableCell): void;
    search(key: string, options?: FindOptions): FindResult[];
    applyDropResult(item: ReportItem | TableCell, r: IDropResult): boolean;
    addAsset(group: AssetGroup | string, item: AssetItem): void;
    removeAsset(item: AssetItem): void;
    renameData(data: IReportData, newName: string): boolean;
    addData(data: IReportData): boolean;
    removeData(data: string | IReportData): boolean;
    saveSimpleData(data: SimpleData, values: any): void;
    saveItems(items: ReportItem[]): string;
    pasteItems(sources: string, target: ReportPageItem): ReportItem[];
    /**
     * 아이템의 위치를 변경한다. Undo 가능하다.
     *
     * @param item - 아이템 객체.
     * @param newX - x 위치.
     * @param newY - y 위치.
     */
    moveItem(item: ReportItem, newX: any, newY: any): void;
    moveItemDir(item: ReportItem, dir: string, newPt: number): void;
    resizeItem(item: ReportItem, orgWidth: any, orgHeight: any, width: number, height: number, dx: number, dy: number): void;
    resizeSpace(item: SpaceItem, orgSize: any, size: number, delta: number): void;
    resizeAndMove(item: ReportItem, orgWidth: any, orgHeight: any, width: number, height: number, dx: number, dy: number, newX: any, newY: any): void;
    alignItem(item: ReportPageItem, align: 'left' | 'top' | 'center' | 'right' | 'bottom'): void;
    alignItems(items: ReportPageItem[], align: 'left' | 'top' | 'center' | 'right' | 'bottom'): void;
    changeItemIndex(item: ReportItem, newIndex: number): boolean;
    clearTexts(items: ReportItem[]): void;
    /**
     * col + 1 컬럼의 너비를 줄이거나 늘이면서 col 컬럼의 너비를 변경한다.
     */
    adjustColumnWidths(table: ITable, col: number, colPoints: number[], newSize: number): void;
    /**
     * row + 1 행의 높이를 줄이거나 늘이면서 row 행의 높이를 변경한다.
     */
    adjustRowHeights(table: TableBase, row: number, rowPoints: number[], newSize: number): void;
    getInvalids(): {
        item: ReportItem;
        reason: string;
    }[];
    private $_refreshInvalids;
    private onPageItemAdded;
    private onPageItemsAdded;
    private onPageItemRemoved;
    private onPageItemsRemoved;
    private onPageItemChanged;
    protected _fireReset(): void;
    protected _firePaperChanged(): void;
    protected _fireItemAdd(group: ReportGroupItem, item: ReportItem, index: number): boolean;
    protected _fireItemMoved(item: ReportItem, index: number): void;
    protected _fireCellMerged(cell: TableCell): void;
    protected _fireAlert(item: ReportItem, message: string): void;
}

interface IOutlineSource {
    outlineParent: IOutlineSource;
    outlineExpandable: boolean;
    outlineItems?: IOutlineSource[];
    outlineLabel: string;
    outlineOrder: number;
    getSaveType(): string;
    canRemoveFrom(): boolean;
    canParentOf?(itemType: string): boolean;
}

declare abstract class ChartObject<T extends ReportGroupItem> extends ReportItem {
    static readonly PROPINFOS: IPropInfo[];
    private _chart;
    constructor(chart: T, name?: string);
    get chart(): T;
    canHide(): boolean;
    get page(): ReportPage;
    get report(): Report;
    get dataParent(): ReportGroupItem;
    get marqueeParent(): ReportItem;
    getSaveType(): string;
    protected _getEditProps(): IPropInfo[];
    protected _doLoad(loader: IReportLoader, src: any): void;
    protected _doSave(target: any): void;
    protected _isDefaultVisible(): boolean;
    protected _getPropsWrapper(target: any, excludes?: string[], names?: {
        [key: string]: string;
    }): any;
}
declare abstract class ChartTextObject<T extends ReportGroupItem> extends ChartObject<T> {
    static readonly PROP_TEXT = "text";
    static readonly PROPINFOS: IPropInfo[];
    private _text;
    constructor(chart: T);
    /** text */
    get text(): string;
    set text(value: string);
    protected _getEditProps(): IPropInfo[];
    protected _getStyleProps(): string[];
    protected _doLoad(loader: IReportLoader, src: any): void;
    protected _doSave(target: object): void;
}
declare abstract class ChartSeries<T extends ReportGroupItem> extends ChartObject<T> {
    static readonly PROP_VALUE_FIELD = "valueField";
    static readonly PROP_VALUES = "values";
    static readonly PROPINFOS: IPropInfo[];
    private _designVisible;
    private _valueField;
    private _values;
    constructor(chart: T);
    getPropDomain(prop: IPropInfo): any[];
    abstract get seriesType(): string;
    /**
     * design visible
     */
    get designVisible(): boolean;
    set designVisible(value: boolean);
    /**
     * valueField
     **/
    get valueField(): string;
    set valueField(value: string);
    /**
     * valueField가 지정되면 이 속성은 무시된다.
     */
    get values(): number[];
    set values(value: number[]);
    getValues(printing: boolean, dp: IReportDataProvider): any[];
    getSaveType(): string;
    get displayPath(): string;
    get outlineLabel(): string;
    protected _getEditProps(): IPropInfo[];
    protected _doLoad(loader: IReportLoader, src: any): void;
    protected _doSave(target: object): void;
}
declare abstract class ChartSeriesCollection<T extends ReportGroupItem> extends ReportItemCollection<ChartSeries<T>> {
    private _chart;
    private _series;
    constructor(chart?: T);
    get outlineParent(): IOutlineSource;
    get outlineLabel(): string;
    get outlineExpandable(): boolean;
    get outlineItems(): IOutlineSource[];
    /** chart */
    get chart(): T;
    /** count */
    get count(): number;
    get items(): ReportPageItem[];
    get visibleCount(): number;
    load(loader: IReportLoader, src: any): void;
    save(target: any): void;
    get(index: number): ChartSeries<T>;
    indexOf(series: ChartSeries<T>): number;
    add(loader: IReportLoader, series: ChartSeries<T> | ConfigObject, index?: number): ChartSeries<T>;
    addAll(loader: IReportLoader, series: (ChartSeries<T> | ConfigObject)[], index?: number): boolean;
    removeAt(index: number): boolean;
    remove(series: ChartSeries<T>): boolean;
    clear(): boolean;
    select(series: ChartSeries<T>): void;
    getSaveType(): string;
    get page(): ReportPage;
    get displayPath(): string;
    get level(): number;
    isAncestorOf(item: ReportPageItem): boolean;
    protected abstract _createSeries(loader: IReportLoader, src: any): ChartSeries<T>;
    protected abstract _seriesChanged(series: ChartSeries<T>): void;
    private $_add;
    private $_invalidateSeries;
    private $_seriesChanged;
}

/**
 * Chart title.
 */
declare class HichartTitle extends ChartTextObject<HichartItem> {
    constructor(chart: HichartItem);
    getSaveLabel(): string;
    protected _doDefaultInit(loader: IReportLoader, parent: ReportGroupItem, hintWidth: number, hintHeight: number): void;
}
/**
 * Highcharts chart item.
 */
declare class HichartItem extends ReportGroupItem {
    static readonly PROP_HICHART_THEME = "theme";
    static readonly PROP_HICHART_INVERTED = "inverted";
    static readonly PROP_HICHART_TITLE = "title";
    static readonly PROP_HICHART_XAXIS = "xAxis";
    static readonly PROP_HICHART_YAXIS = "yAxis";
    static readonly PROP_HICHART_LEGEND = "legend";
    static readonly PROP_HICHART_SERIES = "series";
    static readonly PROPINFOS: IPropInfo[];
    static readonly STYLE_PROPS: string[];
    static readonly $_ctor: string;
    static readonly ITEM_TYPE = "Highchart";
    private _theme;
    private _inverted;
    private _title;
    private _xAxis;
    private _yAxis;
    private _legend;
    private _series;
    constructor(name: string);
    get outlineItems(): IOutlineSource[];
    /** theme */
    get theme(): string;
    set theme(value: string);
    /** inverted */
    get inverted(): boolean;
    set inverted(value: boolean);
    /** title */
    get title(): HichartTitle;
    /** xAxis */
    get xAxis(): HichartXAxis;
    /** yAxis */
    get yAxis(): HichartYAxis;
    /** legend */
    get legend(): HichartLegend;
    /** series */
    get series(): HichartSeriesCollection;
    /**
     * 시리즈들을 Hichart 모델이 아니라 HichartItem의 자식으로 설정한다.
     * 시리즈에 대응하는 별도의 view는 존재하지 않지만,
     * Outline view에는 별도의 항목으로 표시돼서 chart와 별도로 속성을 편집할 수 있게 한다.
     */
    addSeries(series: any, index?: number): HichartSeries;
    removeSeries(series: HichartSeries): void;
    selectSeries(series: HichartSeries): void;
    getSaveType(): string;
    get outlineLabel(): string;
    needDesignWidth(): boolean;
    needDesignHeight(): boolean;
    protected _getEditProps(): IPropInfo[];
    protected _getStyleProps(): string[];
    protected _doDefaultInit(loader: IReportLoader, parent: ReportGroupItem, hintWidth: number, hintHeight: number): void;
    protected _doLoad(loader: IReportLoader, src: any): void;
    protected _doSave(target: object): void;
    canAddTo(group: ReportGroupItem): boolean;
    private $_seriesChanged;
}
/**
 * Axis title.
 */
declare class HichartAxisTitle extends ChartTextObject<HichartItem> {
    constructor(chart: HichartItem);
    getSaveLabel(): string;
}
declare abstract class HichartAxis extends ChartObject<HichartItem> {
    static readonly PROP_TITLE = "title";
    static readonly PROPINFOS: IPropInfo[];
    private _title;
    constructor(chart: HichartItem);
    get title(): HichartAxisTitle;
    get outlineParent(): IOutlineSource;
    protected _getEditProps(): IPropInfo[];
    protected _doLoad(loader: IReportLoader, src: any): void;
    protected _doSave(target: object): void;
}
declare class HichartXAxis extends HichartAxis {
    static readonly PROP_CATEGORIES = "categories";
    static readonly PROP_CATEGORY_FIELD = "categoryField";
    static readonly PROPINFOS: IPropInfo[];
    private _categories;
    private _categoryField;
    constructor(chart: HichartItem);
    getPropDomain(prop: IPropInfo): any[];
    /** categories */
    get categories(): string[];
    set categories(value: string[]);
    /** categoryField */
    get categoryField(): string;
    set categoryField(value: string);
    getCategories(printing: boolean, dp: IReportDataProvider): any[];
    getSaveLabel(): string;
    get displayPath(): string;
    get outlineLabel(): string;
    protected _getEditProps(): IPropInfo[];
    protected _doLoad(loader: IReportLoader, src: any): void;
    protected _doSave(target: object): void;
}
declare class HichartYAxis extends HichartAxis {
    static readonly PROP_MIN = "min";
    static readonly PROP_MAX = "max";
    static readonly PROPINFOS: IPropInfo[];
    private _min;
    private _max;
    constructor(chart: HichartItem);
    /** min */
    get min(): number;
    set min(value: number);
    /** max */
    get max(): number;
    set max(value: number);
    getSaveLabel(): string;
    get displayPath(): string;
    get outlineLabel(): string;
    protected _getEditProps(): IPropInfo[];
    protected _doLoad(loader: IReportLoader, src: any): void;
    protected _doSave(target: object): void;
}
declare abstract class HichartSeries extends ChartSeries<HichartItem> {
    static readonly PROPINFOS: IPropInfo[];
    constructor(chart: HichartItem);
    /**
     * label
     */
    canHideMarker(): boolean;
    getWrapper(config: any): any;
    get outlineParent(): IOutlineSource;
    protected _getEditProps(): IPropInfo[];
    protected _doDefaultInit(loader: IReportLoader, parent: ReportGroupItem, hintWidth: number, hintHeight: number): void;
    protected _doLoad(loader: IReportLoader, src: any): void;
    protected _doSave(target: object): void;
    getCollectionLabel(): string;
    canRemoveFrom(): boolean;
}
declare class HichartSeriesCollection extends ChartSeriesCollection<HichartItem> {
    constructor(chart?: HichartItem);
    protected _createSeries(loader: IReportLoader, src: any): HichartSeries;
    protected _seriesChanged(series: HichartSeries): void;
}
declare enum HichartLegendLayout {
    HORIZONTAL = "horizontal",
    VERTICAL = "vertical",
    PROXIMATE = "proximate"
}
declare class HichartLegend extends ChartObject<HichartItem> {
    static readonly PROP_HICHART_ALIGN = "align";
    static readonly PROP_HICHART_VERTICAL_ALIGN = "verticalAlign";
    static readonly PROP_HICHART_LAYOUT = "layout";
    static readonly PROPINFOS: IPropInfo[];
    private _layout;
    private _align;
    private _verticalAlign;
    constructor(chart?: HichartItem);
    /** align */
    get align(): Align;
    set align(value: Align);
    /** verticalAlign */
    get verticalAlign(): VerticalAlign;
    set verticalAlign(value: VerticalAlign);
    /** layout */
    get layout(): HichartLegendLayout;
    set layout(value: HichartLegendLayout);
    protected _getEditProps(): IPropInfo[];
    protected _doLoad(loader: IReportLoader, src: any): void;
    protected _doSave(target: object): void;
    getSaveLabel(): string;
    protected _isDefaultVisible(): boolean;
}

/**
 * Report loader spec.
 */
interface IReportLoader {
    createItem(type: any): ReportItem;
    createHichartSeries(chart: HichartItem, src: any): HichartSeries;
}

interface ISelectionSource {
    selectItem: ReportPageItem;
    canSelectedWith(other: ISelectionSource): boolean;
}
declare enum DropResultType {
    PROP = "prop"
}
interface IDropResult {
    type: DropResultType;
    prop?: string;
    value?: any;
}
/**
 * Report page 구성 요소 기반 클래스.
 * 현재, ReportItem, TableBandField가 있다.
 */
declare abstract class ReportPageItem extends Base implements ISelectionSource, IOutlineSource, IPropertySource {
    get selectItem(): ReportPageItem;
    canSelectedWith(other: ISelectionSource): boolean;
    abstract get outlineParent(): IOutlineSource;
    abstract get outlineExpandable(): boolean;
    abstract get outlineLabel(): string;
    outlineOrder: number;
    get index(): number;
    get outlineItems(): IOutlineSource[];
    abstract getSaveType(): string;
    abstract canRemoveFrom(): boolean;
    canParentOf(itemType: string): boolean;
    abstract getEditProps(): IPropInfo[];
    abstract getStyleProps(): IPropInfo[];
    abstract getSubStyleProps(prop: string): IPropInfo[];
    abstract getPlaceHolder(prop: IPropInfo): string;
    abstract getPropDomain(prop: IPropInfo): any[];
    getProperty(prop: string): any;
    setProperty(prop: string, value: any): void;
    abstract setItemsProperty(sources: IPropertySource[], prop: string, value: any): void;
    abstract getStyle(style: string): string;
    abstract setStyle(style: string, value: string): void;
    abstract getStyleProperty(prop: string): any;
    abstract setStyleProperty(prop: string, value: any): void;
    abstract isChildProp(prop: string): boolean;
    abstract getSubStyleProperty(prop: string, style: string): any;
    abstract setSubStyleProperty(prop: string, style: string, value: any): void;
    abstract setItemsSubStyleProperty(sources: IPropertySource[], prop: string, style: string, value: any): void;
    abstract canPropAdoptDragSource(prop: IPropInfo, source: any): boolean;
    abstract adoptPropDragSource(prop: IPropInfo, source: any): IDropResult;
    isReadOnlyProperty(prop: IPropInfo): boolean;
    /**
     * 이 속성 값이 변경되면 전체 property model을 변경해야 하는가?
     */
    isDominantProp(prop: IPropInfo): boolean;
    isCollectionProp(): boolean;
    getPropertySources(): IPropertySource[];
    getCollectionLabel(): string;
    setItemsStyleProperty(sources: IPropertySource[], prop: string, value: any): void;
    abstract get page(): ReportPage;
    abstract get displayPath(): string;
    abstract get level(): number;
    abstract get styles(): Styles;
    get parent(): ReportGroupItem;
    get dataParent(): ReportGroupItem;
    get displayParent(): ReportPageItem;
    /**
     * 선택됐을 때 표시될 marquee를 생성하는 item.
     */
    get marqueeParent(): ReportItem;
    get printable(): boolean;
    isAncestorOf(item: ReportPageItem): boolean;
    getProps(): any;
    setProps(src: any): void;
    canMove(): boolean;
    protected _loadProp(src: any, prop: string): void;
    protected _loadProps(src: any, ...props: string[]): void;
    protected _loadPropOf(src: any, info: IPropInfo): void;
    protected _loadPropsOf(src: any, infos: IPropInfo[]): void;
    protected _saveProp(target: object, prop: string): void;
    protected _saveProps(target: object, ...props: string[]): void;
    /**
     * 속성값이 undefined 이거나 IPropInfo.default와 동일하면 저장하지 않는다.
     * 속성의 기본값은 undefined이거나 IPropInfo.default와 동일해야 한다!!
     */
    protected _savePropOf(target: object, info: IPropInfo): void;
    protected _savePropsOf(target: object, infos: IPropInfo[]): void;
    protected _arrangePaddingStyles(styles: Styles): void;
    protected _validateSize(v: ValueString): ValueString;
}
declare enum ItemMoveType {
    INNER = "inner",
    OUTER = "outer"
}
declare type ReportItemValueCallback = (ctx: PrintContext, item: ReportItem, row: number, value: any) => any;
declare type ReportItemStyleCallback = (ctx: PrintContext, item: ReportItem, row: number, value: any) => {
    [key: string]: string | undefined;
};
/**
 * Report 구성 요소 기반 클래스.
 *
 * [data]
 * 1. data 속성에 dataProvider에 등록된 리포트 data 이름.
 * 2. value 속성에 "."으로 분리된 값 경로.
 * 3. data를 지정하지 않으면 가장 가까운 조상에 설정된 data.
 * 4. value에 "data::value" 형식으로 지정하면 이 것을 우선.
 */
declare abstract class ReportItem extends ReportPageItem {
    static readonly DEF_DISPLAY_ORDER = 99;
    static readonly PROP_NAME = "name";
    static readonly PROP_TAG = "tag";
    static readonly PROP_LEFT = "left";
    static readonly PROP_RIGHT = "right";
    static readonly PROP_TOP = "top";
    static readonly PROP_BOTTOM = "bottom";
    static readonly PROP_DESIGN_BORDER = "designBorder";
    static readonly PROP_ON_GET_VALUE = "onGetValue";
    static readonly PROP_STYLES = "styles";
    static readonly PROP_ON_GET_STYLES = "onGetStyles";
    static readonly PROP_VISIBLE = "visible";
    static readonly PROP_DATA = "data";
    static readonly PROP_VALUE = "value";
    static readonly PROP_HINT = "hint";
    static readonly PROP_WIDTH = "width";
    static readonly PROP_HEIGHT = "height";
    static readonly PROP_MIN_WIDTH = "minWdth";
    static readonly PROP_MIN_HEIGHT = "minHeight";
    static readonly PROP_LOCKED = "locked";
    static readonly PROP_PAGE_BREAK = "pageBreak";
    static readonly PROP_STYLE_CALLBACK = "styleCallback";
    static readonly PROPINFOS: IPropInfo[];
    static readonly SIZE_PROPINFOS: IPropInfo[];
    static readonly VALUE_PROPINFOS: IPropInfo[];
    static findFloatingAnchor(item: ReportPageItem): ReportItem;
    private _name;
    private _tag;
    private _visible;
    private _data;
    private _value;
    private _valueCallback;
    private _onGetValue;
    private _hint;
    private _width;
    private _height;
    private _minWidth;
    private _minHeight;
    private _styles;
    private _styleCallback;
    private _onGetStyles;
    private _pageBreak;
    private _designOrder;
    private _designBorder;
    private _parent;
    private _index;
    private _childPropInfos;
    private _childProps;
    private _valueCallbackFunc;
    private _valueCallbackDelegate;
    private _styleCallbackFunc;
    private _styleCallbackDelegate;
    private _leftDim;
    private _rightDim;
    private _topDim;
    private _bottomDim;
    private _widthDim;
    private _heightDim;
    private _minWidthDim;
    private _minHeightDim;
    constructor(name: string);
    get outlineParent(): IOutlineSource;
    get outlineExpandable(): boolean;
    /**
     * Report 편집기에서 수정할 수 있는 속성 정의 목록.
     * 속성이 없는 경우라도 빈 배열을 리턴해야 한다.
     * 각 항목은 아래 속성들을 갖는다.
     * {
     *  name: string,
     *  type: DesignType.
     *  category: string,
     *  domain: any[],
     * }
     */
    getEditProps(): IPropInfo[];
    getStyleProps(): IPropInfo[];
    getSubStyleProps(prop: string): IPropInfo[];
    getPlaceHolder(prop: IPropInfo): string;
    /**
     * @internal
     */
    getData(): IReportData;
    /**
     * @internal
     */
    getDataFieldNames(): string[];
    getPropDomain(prop: IPropInfo): any[];
    getProperty(prop: string): any;
    setProperty(prop: string, value: any): void;
    setItemsProperty(sources: IPropertySource[], prop: string, value: any): void;
    getProperties(props: string[] | ConfigObject): ConfigObject;
    setProperties(props: ConfigObject): void;
    getStyleProperty(prop: string): any;
    setStyleProperty(prop: string, value: any): void;
    getSubStyleProperty(prop: string, style: string): any;
    setSubStyleProperty(prop: string, style: string, value: any): void;
    setItemsSubStyleProperty(sources: IPropertySource[], prop: string, style: string, value: any): void;
    canPropAdoptDragSource(prop: IPropInfo, source: any): boolean;
    adoptPropDragSource(prop: IPropInfo, source: any): IDropResult;
    dataNameChanged(data: IReportData, oldName: string): void;
    dataFieldNameChanged(data: IReportData, newName: string, oldName: string): void;
    /** parent */
    get parent(): ReportGroupItem;
    /** dataParent */
    get dataParent(): ReportGroupItem;
    /** index */
    get index(): number;
    /** level */
    get level(): number;
    /** page */
    get page(): ReportPage;
    get report(): Report;
    /** name */
    get name(): string;
    set name(value: string);
    get pathLabel(): string;
    get displayPath(): string;
    /** tag */
    get tag(): string;
    set tag(value: string);
    /** load/save 시 array를 사용하면 true */
    get isArray(): boolean;
    get isBand(): boolean;
    /**
     * false면 자리를 차지하지 않는다.
     */
    get visible(): boolean;
    set visible(value: boolean);
    get removable(): boolean;
    /**
     * IReportData name.
     */
    get data(): string;
    set data(value: string);
    /**
     * 리포트에 지정된 data의 특정 값(들)을 지시하는 경로.
     * "::" 앞쪽에서 설정된 data 이름이 없는 경우,
     * 자신으로 시작해서 Report까지 가장 가까운 곳(dataParent)에 설정된 data에서 값을 가져온다.
     * '${page}', '${pages}', '${date}' 등으로 print context 값을 지정할 수도 있다.
     */
    get value(): string;
    set value(value: string);
    /**
     * Dom title.
     * 출력 리포트에서 이게 필요한가?
     */
    get hint(): string;
    set hint(value: string);
    /**
     * width
     */
    get width(): ValueString;
    set width(value: ValueString);
    /**
     * height
     */
    get height(): ValueString;
    set height(value: ValueString);
    /**
     * minWidth
     */
    get minWidth(): ValueString;
    set minWidth(value: ValueString);
    /**
     * minHeight
     */
    get minHeight(): ValueString;
    set minHeight(value: ValueString);
    /**
     * onGetValue
     */
    get onGetValue(): string;
    set onGetValue(value: string);
    /** valueCallback */
    get valueCallback(): ReportItemValueCallback;
    set valueCallback(value: ReportItemValueCallback);
    /** styles */
    get styles(): Styles;
    set styles(value: Styles);
    /** styleCallback */
    get styleCallback(): ReportItemStyleCallback;
    set styleCallback(value: ReportItemStyleCallback);
    get onGetStyles(): string;
    set onGetStyles(value: string);
    /** pageBreak */
    get pageBreak(): PageBreakMode;
    set pageBreak(value: PageBreakMode);
    /**
     * 아웃라인에 표시되는 라벨명
     */
    get outlineLabel(): string;
    /** designText */
    get designText(): string;
    /** designLevel */
    get designLevel(): number;
    /** childPropInfos */
    get childPropInfos(): IPropInfo[];
    set childPropInfos(value: IPropInfo[]);
    /** floating */
    get floating(): boolean;
    /**
     * outline viewer 등에서 이 아이템이 표시되는 순서.
     * 값이 작을 수록 먼저 표시된다.
     * 기본값은 99.
     */
    get designOrder(): number;
    set designOrder(value: number);
    get designBorder(): boolean;
    set designBorder(value: boolean);
    get isRelativeHeight(): boolean;
    /**
     * ColumnBoxContainer|BoundedContainer
     */
    get left(): any;
    /**
     * ColumnBoxContainer|BoundedContainer
     */
    get right(): any;
    /**
     * RowBoxContainer|BoundedContainer
     */
    get top(): any;
    /**
     * RowBoxContainer|BoundedContainer
     */
    get bottom(): any;
    /**
     * TableContainer.
     * cell row index in table
     */
    get row(): number;
    /**
     * TableContainer.
     * cell column index in table.
     */
    get col(): number;
    /**
     * TableBandRow.
     * 이전 행 값과 동일하면 값을 표시하지 않는다.
     * 값의 비교는 blankFields가 설정되면 그 필드들의 값이 모두 동일한 경우,
     * blankFields가 설정되지 않은 경우 value에 설정된 필드 값이 동일한 경우.
     */
    get equalBlank(): boolean;
    /**
     * TableBandRow.
     * equalBlank가 true일 깨 값을 비교하는 필드들을 ',' 분리해서 지정한다.
     * 이 속성을 지정하지 않으면 value에 지정된 필드의 값으로 비교한다.
     */
    get blankFields(): string;
    /**
     * true로 지정되면 값과 상관 없이 leaf group 내의 모든 셀을 merge한다.
     * 또, 둘 이상의 table row로 출력되는 경우에도 이 아이템이 속한 컬럼 셀들을 모두 병합한다.
     * 한 행으로 구성된 group field에 bind된 아이템에만 적용해야 의미가 있다.
     */
    get mergedInGroup(): boolean;
    /**
     * 디자이너에서 추기될 때 초기값들 설정.
     */
    defaultInit(loader: IReportLoader, group: ReportGroupItem, hintWidth: number, hintHeight: number): void;
    getSaveType(): string;
    /**
     * 하위 object 저장 label.
     * _loadObject(), _saveObject()에서 사용.
     */
    getSaveLabel(): string;
    isContextValue(): boolean;
    /**
     * 아이템이 특별한 부모에 포함될 때 추가되는 속성들.
     * 예를들어 아이템을 table의 cell로 이동시키면 table에 추가하기 전
     * 사용자가 마우스로 지정한 곳에 있는 셀의 'col', 'row' 속성을 설정해서
     * table이 적절히 item을 배치하도록 한다.
     */
    setChildProp(prop: string, value: any): boolean;
    private $_setChildProp;
    isChildProp(prop: string): boolean;
    getChildProp(prop: string, defaultValue?: any): any;
    getChildProps(): any[];
    isStyleProp(prop: string): boolean;
    canParentOf(itemType: string): boolean;
    canAddTo(group: ReportGroupItem): boolean;
    prepareLayout(printing: boolean): void;
    preparePrint(ctx: PrintContext): void;
    getLeft(domain: number): number;
    setLeft(dim: Dimension): void;
    getRight(domain: number): number;
    setRight(dim: Dimension): void;
    getTop(domain: number): number;
    setTop(dim: Dimension): void;
    getBottom(domain: number): number;
    setBottom(dim: Dimension): void;
    getWidth(domain: number): number;
    getHeight(domain: number): number;
    getMinWidth(domain: number): number;
    getMinHeight(domain: number): number;
    canResize(dir: ResizeDirection): boolean;
    canResizeWidth(): boolean;
    canResizeHeight(): boolean;
    resize(width: number, height: number): ReportItem;
    hasStyle(style: string): boolean;
    getStyle(style: string): string;
    setStyle(style: string, value: string): void;
    clearStyle(style: string): void;
    clearStyles(css: CSSStyleDeclaration): void;
    load(loader: IReportLoader, source: any): void;
    save(target: object): boolean;
    getFloatingContainer(): FloatingContainer;
    delete(): void;
    isAncestor(group: ReportGroupItem): boolean;
    private $_getValue;
    /**
     * onGetStyles 등 callback 내에서 사용할 수 있게 노출.
     */
    getValue(row: number, field: string): any;
    /**
     * 출력 시 ReportItemElement에서 호출.
     */
    getPrintValue(dp: IReportDataProvider, row: number): any;
    protected _getParentData(): string;
    canRemoveFrom(): boolean;
    canAdoptDragSource(source: any): boolean;
    adoptDragSource(source: any): IDropResult;
    canPageBreak(): boolean;
    isBreakBefore(): boolean;
    isBreakAfter(): boolean;
    getInvalids(report: Report): string[];
    get marqueeParent(): ReportItem;
    get printable(): boolean;
    isReadOnlyProperty(prop: IPropInfo): boolean;
    protected _sizable(): boolean;
    protected _boundable(): boolean;
    /**
     * 리포트 아이템 생성 시, 수행할 초기화 작업을 정의한다.
     *
     * @param loader - 아이템을 로드하는 리포트 로더
     * @param group - 아이템의 상위 리포트그룹아이템
     * @param hintWidth - 아이템 영역 너비
     * @param hintHeight - 아이템 영역 높이
     */
    protected _doDefaultInit(loader: IReportLoader, group: ReportGroupItem, hintWidth: number, hintHeight: number): void;
    protected _getSubStyle(prop: string, style: string): any;
    protected _setSubStyle(prop: string, style: string, value: any): void;
    protected _doApplyStyle(prop: string, value: string, target: CSSStyleDeclaration): boolean;
    protected _setLeft(value: ValueString): void;
    protected _setRight(value: ValueString): void;
    protected _setTop(value: ValueString): void;
    protected _setBottom(value: ValueString): void;
    protected _getEditProps(): IPropInfo[];
    protected _getStyleProps(): string[];
    protected _getChildStyleProps(prop: string): string[];
    protected _valueable(): boolean;
    protected _datable(): boolean;
    private $_attached;
    protected _doAttached(): void;
    private $_detached;
    protected _doDetached(): void;
    protected _isLoading(): boolean;
    protected _changed(prop: string, newValue: any, oldValue: any): void;
    get stylable(): boolean;
    protected _doLoad(loader: IReportLoader, src: any): void;
    protected _saveChildPropsOf(target: object, infos: IPropInfo[]): void;
    protected _doSave(target: object): void;
    protected _doPrepareLayout(printing: boolean): void;
    protected _doPreparePrint(ctx: PrintContext): void;
    protected _loadObject(item: ReportItem, loader: IReportLoader, src: any): void;
    protected _loadObjects(items: ReportItem[], loader: IReportLoader, src: any): void;
    protected _saveObject(item: ReportItem, target: any): void;
    protected _saveObjects(items: ReportItem[], target: any): void;
}
/**
 * 하나 이상의 report item을 포함하는 group item 기반 클래스.
 */
declare abstract class ReportGroupItem extends ReportItem {
    static readonly PROP_DESIGN_WIDTH = "designWidth";
    static readonly PROP_DESIGN_HEIGHT = "designHeight";
    static readonly PROPINFOS: IPropInfo[];
    private _designWidth;
    private _designHeight;
    private _items;
    layoutChanged: boolean;
    constructor(name: string);
    get outlineExpandable(): boolean;
    get outlineItems(): IOutlineSource[];
    /**
     * child props를 제공하는가?
     */
    get isChildPropContainer(): boolean;
    /** count */
    get count(): number;
    /** items */
    get items(): ReportItem[];
    /** designWidth */
    get designWidth(): number;
    set designWidth(value: number);
    /** designHeight */
    get designHeight(): number;
    set designHeight(value: number);
    get dataDominant(): boolean;
    get firstChild(): ReportItem;
    get lastChild(): ReportItem;
    get isDataRowContainer(): boolean;
    needDesignWidth(): boolean;
    needDesignHeight(): boolean;
    get(index: number): ReportItem;
    canContainsBand(): boolean;
    contains(item: ReportPageItem): boolean;
    indexOf(item: ReportPageItem): number;
    getNames(list: string[], recursive?: boolean): string[];
    find(name: string, recursive?: boolean): ReportItem;
    canAdd(item: ReportItem): boolean;
    append(item: ReportPageItem, slient?: boolean): boolean;
    /**
     * @param silent View나 Tool 쪽에서 지정하고 사용한다.
     */
    add(item: ReportPageItem, index?: number, silent?: boolean): boolean;
    canRemove(item: ReportItem): boolean;
    remove(item: ReportItem): void;
    clear(): void;
    getMoveType(item: ReportItem): ItemMoveType;
    canResizeChild(item: ReportItem, dir: ResizeDirection): boolean;
    search(key: string, options: FindOptions, results: FindResult[]): void;
    canChangeChildProp(item: ReportPageItem, prop: string, value: any): boolean;
    changeChildIndex(child: ReportItem, newIndex: number): boolean;
    canAlign(child: ReportItem): boolean;
    canAlignTo(child: ReportPageItem, to: string): boolean;
    filter(callback: (item: ReportItem) => boolean): ReportItem[];
    getDescendants(all?: boolean, recursive?: boolean): ReportItem[];
    collectInvalids(report: Report, list: {
        item: ReportItem;
        reason: string;
    }[]): void;
    collectBlankItems(childs?: ReportItem[]): ReportItem[];
    protected _getEditProps(): IPropInfo[];
    protected _getStyleProps(): string[];
    protected _maxChildCount(): number;
    isAncestorOf(item: ReportPageItem): boolean;
    canParentOf(itemType: string): boolean;
    prepareLayout(printing: boolean): void;
    preparePrint(ctx: PrintContext): void;
    protected _getNameOfItems(): string;
    protected _doLoad(loader: IReportLoader, src: any): void;
    protected _ignoreItems(): boolean;
    save(target: object): boolean;
    dataNameChanged(data: IReportData, oldName: string): void;
    protected get internalItems(): ReportItem[];
    protected _valueable(): boolean;
    protected _loadChildProp(child: ReportItem, prop: string, src: any): void;
    protected _loadChildProps(child: ReportItem, props: string[], src: any): void;
    protected _loadChildPropsOf(child: ReportItem, src: any, infos: IPropInfo[]): void;
    protected _getChildPropInfos(item: ReportItem): IPropInfo[];
    protected _loadChild(loader: IReportLoader, item: ReportItem, src: any): ReportItem;
    protected _loadItems(loader: IReportLoader, src: any): void;
    protected _doLoadChild(child: ReportItem, src: any): void;
    protected _saveItems(target: any[]): void;
    protected _doSaveItems(target: any[], items: ReportItem[]): void;
    protected _addItem(item: ReportItem, index: number, silent: boolean): ReportItem;
    protected _removeItem(item: ReportItem): number;
    protected _clearItems(): void;
    protected _doItemAdded(item: ReportItem, index: number): void;
    protected _doItemRemoved(item: ReportItem, index: number): void;
    private $_resetIndices;
    private $_childChanged;
    protected _doItemChanged(item: ReportItem, prop: string, value: any, oldValue: any): void;
    protected _setOutlineOrders(start: number, ...items: ReportPageItem[]): void;
}
declare abstract class ReportItemCollectionItem extends ReportPageItem {
    private _collection;
    private _styles;
    constructor(collection: ReportItemCollection<any>, src?: any);
    get outlineParent(): IOutlineSource;
    get outlineExpandable(): boolean;
    get outlineLabel(): string;
    getSaveType(): string;
    canRemoveFrom(): boolean;
    getPropDomain(prop: IPropInfo): any[];
    getStyleProps(): IPropInfo[];
    getStyle(style: string): string;
    setStyle(style: string, value: string): void;
    getStyleProperty(prop: string): string;
    setStyleProperty(prop: string, value: any): void;
    getSubStyleProps(prop: string): IPropInfo[];
    getPlaceHolder(prop: IPropInfo): string;
    setItemsProperty(sources: IPropertySource[], prop: string, value: any): void;
    getSubStyleProperty(prop: string, style: string): any;
    isChildProp(prop: string): boolean;
    setSubStyleProperty(prop: string, style: string, value: any): void;
    setItemsSubStyleProperty(sources: IPropertySource[], prop: string, style: string, value: any): void;
    canPropAdoptDragSource(prop: IPropInfo, source: any): boolean;
    adoptPropDragSource(prop: IPropInfo, source: any): IDropResult;
    abstract get itemType(): string;
    /** styles */
    get styles(): Styles;
    set styles(value: Styles);
    get collection(): ReportItemCollection<any>;
    get level(): number;
    load(src: any): void;
    save(target: any): any;
    protected _doLoad(src: any): void;
    protected _doSave(target: any): void;
    protected abstract _getStyleProps(): string[];
    protected _changed(prop: string, newValue: any, oldValue: any): void;
}
declare abstract class ReportItemCollection<T extends ReportPageItem> extends ReportPageItem {
    canRemoveFrom(): boolean;
    canParentOf(itemType: string): boolean;
    getEditProps(): IPropInfo[];
    getStyleProps(): IPropInfo[];
    getSubStyleProps(prop: string): IPropInfo[];
    getPlaceHolder(prop: IPropInfo): string;
    getPropDomain(prop: IPropInfo): any[];
    getProperty(prop: string): any;
    setProperty(prop: string, value: any): void;
    setItemsProperty(sources: IPropertySource[], prop: string, value: any): void;
    getStyleProperty(prop: string): any;
    getStyle(style: string): string;
    setStyle(style: string, value: string): void;
    setStyleProperty(prop: string, value: any): void;
    setItemsStyleProperty(sources: IPropertySource[], prop: string, value: any): void;
    isChildProp(prop: string): boolean;
    getSubStyleProperty(prop: string, style: string): any;
    setSubStyleProperty(prop: string, style: string, value: any): void;
    setItemsSubStyleProperty(sources: IPropertySource[], prop: string, style: string, value: any): void;
    canPropAdoptDragSource(prop: IPropInfo, source: any): boolean;
    adoptPropDragSource(prop: IPropInfo, source: any): IDropResult;
    isCollectionProp(): boolean;
    getPropertySources(): IPropertySource[];
    abstract get count(): number;
    abstract get items(): ReportPageItem[];
    abstract get(index: number): T;
    preparePrint(ctx: PrintContext): void;
    forEach(callback: (item: T, index: number) => void): void;
    get styles(): Styles;
    protected _itemChanged(item: ReportPageItem, prop: string, newValue: any, oldValue: any): void;
    protected _itemAdded(item: ReportPageItem): void;
    protected _itemsAdded(items: ReportPageItem[]): void;
    protected _itemRemoved(item: ReportPageItem, oldParent: ReportGroupItem): void;
    protected _itemsRemoved(items: ReportPageItem[]): void;
    protected _doPreparePrint(ctx: PrintContext): void;
}
declare enum AnchorPosition {
    CENTER = "center",
    LEFT = "left",
    RIGHT = "right",
    TOP = "top",
    BOTTOM = "bottom",
    INNER_LEFT = "innerLeft",
    INNER_RIGHT = "innerRight",
    INNER_TOP = "innerTop",
    INNER_BOTTOM = "innerBottom"
}
/**
 * 동일 그룹 내의 다른 아이템을 기준점으로 표시되는 아이템.
 * 자식으로 floating을 추가할 수 없다.
 */
declare class FloatingContainer extends ReportGroupItem {
    static readonly PROP_ANCHOR_TARGET = "anchorTarget";
    static readonly PROP_ANCHOR_POSITION = "anchorPosition";
    static readonly PROPINFOS: IPropInfo[];
    static readonly $_ctor: string;
    static readonly ITEM_TYPE = "Floating Container";
    private _anchorTarget;
    private _anchorPosition;
    constructor(name: string);
    /** anchorTarget */
    get anchorTarget(): string;
    set anchorTarget(value: string);
    /** anchorPosition */
    get anchorPosition(): AnchorPosition;
    set anchorPosition(value: AnchorPosition);
    getSaveType(): string;
    get outlineLabel(): string;
    protected _maxChildCount(): number;
    protected _boundable(): boolean;
    protected _getEditProps(): IPropInfo[];
    getPropDomain(prop: IPropInfo): any[];
    protected _doDefaultInit(loader: IReportLoader, parent: ReportGroupItem, hintWidth: number, hintHeight: number): void;
    protected _doLoad(loader: IReportLoader, src: any): void;
    protected _doSave(target: object): void;
    canAdd(item: ReportItem): boolean;
}
/**
 * 자식들의 위치를 지정할 수 있는 container.
 * 위치 설정이 안된 item은 중앙에 정렬 시킨다.
 */
declare abstract class BoundedContainer extends ReportGroupItem {
    static readonly CHILD_PROPS: IPropInfo[];
    constructor(name: string);
    protected _getChildPropInfos(item: ReportItem): IPropInfo[];
    protected _doLoadChild(child: ReportItem, src: any): void;
}
/**
 * 자식을 대리하는 그룹.
 * 자식 하나만 가질 수 있다.
 */
declare abstract class CellGroup extends ReportGroupItem {
    private _item;
    constructor(item: ReportItem, name: string);
    /**
     * item
     */
    get item(): ReportItem;
    get isEmpty(): boolean;
    get isChildPropContainer(): boolean;
    set childPropInfos(value: IPropInfo[]);
    get printable(): boolean;
    protected _maxChildCount(): number;
    protected _doItemChanged(item: ReportItem, prop: string, value: any, oldValue: any): void;
}
/**
 * CellGroup들만을 자식으로 갖는다.
 */
declare abstract class CellContainer extends ReportGroupItem {
    /** @internal */
    noPrepareCell: boolean;
    constructor(name: string);
    contains(item: ReportItem): boolean;
    indexOf(item: ReportItem): number;
    findCell(item: ReportItem): CellGroup;
    find(name: string, recursive?: boolean): ReportItem;
    protected _loadChild(loader: IReportLoader, item: ReportItem, src: any): ReportItem;
    protected _addItem(item: ReportItem, index: number, silent: boolean): ReportItem;
    protected _removeItem(item: ReportItem): number;
    protected abstract _prepareCellGroup(item: ReportItem): CellGroup;
    protected _unprepareCellGroup(item: ReportItem): CellGroup;
}
declare enum BandSectionLayout {
    ACROSS_DOWN = "acrossDown",
    DOWN_ACROSS = "downAcross"
}

interface IPropertySource {
    getEditProps(): IPropInfo[];
    getStyleProps(): IPropInfo[];
    getSubStyleProps(prop: string): IPropInfo[];
    isDominantProp(prop: IPropInfo): boolean;
    getPlaceHolder(prop: IPropInfo): string;
    getPropDomain(prop: IPropInfo): any[];
    getProperty(prop: string): any;
    setProperty(prop: string, value: any): void;
    setItemsProperty(sources: IPropertySource[], prop: string, value: any): void;
    getStyleProperty(prop: string): any;
    setStyleProperty(prop: string, value: any): void;
    setItemsStyleProperty(sources: IPropertySource[], prop: string, value: any): void;
    getSubStyleProperty(prop: string, style: string): any;
    setSubStyleProperty(prop: string, style: string, value: any): void;
    setItemsSubStyleProperty(sources: IPropertySource[], prop: string, style: string, value: any): void;
    isReadOnlyProperty(prop: IPropInfo): boolean;
    canPropAdoptDragSource(prop: IPropInfo, source: any): boolean;
    adoptPropDragSource(prop: IPropInfo, source: any): IDropResult;
    isCollectionProp(): boolean;
    getPropertySources(): IPropertySource[];
    getCollectionLabel(): string;
}
interface IPropInfo {
    name: string;
    category: string;
    type: any;
    typeProps?: any;
    parent?: string;
    indented?: boolean;
    visible?: (source: IPropertySource) => boolean;
    multiple: boolean;
    default: any;
    readonly?: boolean;
    domain?: any[] | any;
    label?: string;
    tag?: string;
    params?: any;
    signature?: string;
    validate?: (source: IPropertySource, inputValue: any) => void;
    description?: string;
}

/**
 * 자식 item들을 순서대로 쌓아가며 배치한다.
 * 위치 설정이 안된 item은 중앙에 정렬 시킨다.
 */
declare class StackContainer extends BoundedContainer {
    static readonly PROP_OVERFLOW = "overflow";
    static readonly PROPINFOS: IPropInfo[];
    static readonly $_ctor: string;
    static readonly ITEM_TYPE = "Stack Container";
    static readonly STYLE_PROPS: string[];
    private _overflow;
    constructor(name: string);
    /**
     * true로 설정되면 자식이 넘칠 수 있다.
     * 특히, table을 자식으로 갖는 경우 true로 설정해야 우측 끝이 표시되는 경우가 있을 수 있다.
     */
    get overflow(): boolean;
    set overflow(value: boolean);
    get outlineLabel(): string;
    getSaveType(): string;
    protected _datable(): boolean;
    protected _doDefaultInit(loader: IReportLoader, parent: ReportGroupItem, hintWidth: number, hintHeight: number): void;
    protected _getStyleProps(): string[];
    canAlign(child: ReportItem): boolean;
    canAdoptDragSource(source: any): boolean;
    getMoveType(item: ReportItem): ItemMoveType;
}

/**
 * 리포트 페이지의 수평 전체와 수직 일부를 차지하는 영역 그룹 item.
 * body를 제외하고 페이지를 넘어갈 수 없다.
 */
declare abstract class PageSection extends StackContainer {
    constructor(name: string);
    get removable(): boolean;
    get page(): ReportPage;
    canMove(): boolean;
    getSaveType(): string;
    canResize(dir: ResizeDirection): boolean;
    protected _getStyleProps(): string[];
}
/**
 * 섹션 위아래에 공간(space)를 설정할 수 있는 page 섹션.
 */
declare abstract class SpaceableSection extends PageSection {
    static readonly PROP_SPACE_TOP = "spaceTop";
    static readonly PROP_SPACE_BOTTOM = "spaceBottom";
    static readonly PROPINFOS: IPropInfo[];
    private _spaceTop;
    private _spaceBottom;
    constructor(name: string);
    /**
     * spaceTop
     */
    get spaceTop(): number;
    set spaceTop(value: number);
    /**
     * spaceBottom
     */
    get spaceBottom(): number;
    set spaceBottom(value: number);
    protected _doLoad(loader: IReportLoader, src: any): void;
    protected _doSave(target: object): void;
    protected _getEditProps(): IPropInfo[];
}
/**
 * Report header model.
 */
declare class ReportHeader extends SpaceableSection {
    static readonly $_ctor: string;
    constructor();
    get outlineLabel(): string;
    get pathLabel(): string;
    canResize(dir: ResizeDirection): boolean;
}
/**
 * Report footer model.
 */
declare class ReportFooter extends SpaceableSection {
    static readonly PROP_ALIGN_TO_BOTTOM = "alignToBottom";
    static readonly PROPINFOS: IPropInfo[];
    static readonly $_ctor: string;
    private _alignToBottom;
    constructor();
    /**
     * wrap
     */
    get alignToBottom(): boolean;
    set alignToBottom(value: boolean);
    get outlineLabel(): string;
    get pathLabel(): string;
    canResize(dir: ResizeDirection): boolean;
    protected _getEditProps(): IPropInfo[];
    protected _doLoad(loader: IReportLoader, src: any): void;
    protected _doSave(target: object): void;
}
/**
 * Report page header model.
 */
declare class PageHeader extends SpaceableSection {
    static readonly $_ctor: string;
    constructor();
    get outlineLabel(): string;
    get pathLabel(): string;
    canResize(dir: ResizeDirection): boolean;
}
/**
 * Report page footer model.
 */
declare class PageFooter extends SpaceableSection {
    static readonly $_ctor: string;
    constructor();
    get outlineLabel(): string;
    get pathLabel(): string;
    canResize(dir: ResizeDirection): boolean;
}

/** @internal */
declare abstract class BoundedContainerElement<T extends BoundedContainer> extends ReportGroupItemElement<T> {
    constructor(doc: Document, model: T, name: string);
    protected _prepareChild(child: ReportElement): void;
    protected _doMeasure(ctx: PrintContext, dom: HTMLElement, hintWidth: number, hintHeight: number): Size;
    protected _layoutItem(ctx: PrintContext, child: ReportElement, model: ReportItem, x: number, y: number, width: number, height: number): void;
    protected _layoutChild(ctx: PrintContext, child: ReportElement, x: number, y: number, width: number, height: number): void;
}

/** @internal */
declare abstract class StackContainerElement<T extends StackContainer> extends BoundedContainerElement<T> {
    constructor(doc: Document, model: T, name?: string);
    get debugLabel(): string;
    protected _doSetStyles(model: ReportItem, dom: HTMLElement): void;
    protected _getPrev(item: ReportItemView): ReportItemView;
    protected _getNext(item: ReportItemView): ReportItemView;
    getUpper(item: ReportItemView): ReportItemView;
    getLower(item: ReportItemView): ReportItemView;
    private $_getSorted;
}

/** @internal */
declare abstract class SectionElement<T extends PageSection> extends StackContainerElement<T> {
    constructor(doc: Document, model: T, name: string);
    protected _doDispose(): void;
    protected _needDesignBox(): boolean;
    protected _isContexable(): boolean;
    protected _doPrepareMeasure(ctx: PrintContext, dom: HTMLElement): void;
    protected _doMeasure(ctx: PrintContext, dom: HTMLElement, hintWidth: number, hintHeight: number): Size;
    measure(ctx: PrintContext, hintWidth: number, hintHeight: number): Size;
}
/** @internal */
declare class ReportHeaderElement extends SectionElement<ReportHeader> {
    constructor(doc: Document, model?: ReportHeader);
    protected _doDispose(): void;
    get debugLabel(): string;
    protected _getCssSelector(): string;
}
/** @internal */
declare class ReportFooterElement extends SectionElement<ReportFooter> {
    static readonly STYLE_NAME = "rr-page-header rr-group-element";
    static isFooter: (div: HTMLElement) => boolean;
    constructor(doc: Document, model?: ReportFooter);
    protected _doDispose(): void;
    get debugLabel(): string;
    protected _getCssSelector(): string;
}
/** @internal */
declare class PageHeaderElement extends SectionElement<PageHeader> {
    constructor(doc: Document, model?: PageHeader);
    protected _doDispose(): void;
    get debugLabel(): string;
    protected _getCssSelector(): string;
    protected _isContexable(): boolean;
}
/** @internal */
declare class PageFooterElement extends SectionElement<PageFooter> {
    constructor(doc: Document, model?: PageFooter);
    protected _doDispose(): void;
    get debugLabel(): string;
    protected _getCssSelector(): string;
    protected _isContexable(): boolean;
}

/**
 * @internal
 * View base for BoxContainer.
 */
declare abstract class BoxContainerElement<T extends BoxContainer> extends ReportGroupItemElement<T> {
    protected _container: ReportGroupItemView;
    protected _paddings: any;
    protected _gap: number;
    constructor(doc: Document, model: T, name: string);
    protected _doDispose(): void;
    get gap(): number;
    get debugLabel(): string;
    protected _needDesignBox(): boolean;
    protected _initDom(doc: Document, dom: HTMLElement): void;
    protected _doSetStyles(model: ReportItem, dom: HTMLElement): void;
    protected _doMeasure(ctx: PrintContext, dom: HTMLElement, hintWidth: number, hintHeight: number): Size;
    protected _doAfterMeasure(ctx: PrintContext, dom: HTMLElement, hintWidth: number, hintHeight: number, sz: Size): void;
}
/**
 * View for ColumnBoxContainer
 */
declare class ColumnBoxContainerElement extends BoxContainerElement<ColumnBoxContainer> {
    private _points;
    constructor(doc: Document, model: ColumnBoxContainer, name?: string);
    protected _doDispose(): void;
    getRowPoints(): number[];
    get debugLabel(): string;
    protected _getCssSelector(): string;
    protected _initDom(doc: Document, dom: HTMLElement): void;
    protected _doMeasure(ctx: PrintContext, dom: HTMLElement, hintWidth: number, hintHeight: number): Size;
    protected _doLayoutContent(ctx: PrintContext): void;
    protected _layoutItem(ctx: PrintContext, child: ReportElement, model: ReportItem, x: number, y: number, width: number, height: number): void;
    getLeft(view: ReportItemView): ReportItemView;
    getRight(view: ReportItemView): ReportItemView;
}

/** @internal */
declare class PageBodyElement extends ReportElement {
    private _model;
    private _findable;
    private _backContainerView;
    private _frontContainerView;
    private _itemsView;
    private _modelChanged;
    constructor(doc: Document, model?: PageBody);
    protected _doDispose(): void;
    /** model */
    get model(): PageBody;
    set model(value: PageBody);
    /** empty */
    get empty(): boolean;
    get itemsView(): ColumnBoxContainerElement;
    isPageDom(dom: HTMLElement): boolean;
    findElement(modelName: string): ReportItemElement<ReportItem>;
    findElementOf(dom: HTMLElement): ReportItemElement<ReportItem>;
    getElementOf(model: ReportItem): ReportItemElement<ReportItem>;
    /**
     * 페이지의 한 행을 전부 차지하는가?
     */
    isLine(view: ReportItemView): boolean;
    /**
     * view가 포함된 line.
     * view가 line이면 view.
     */
    getLineOf(view: ReportItemView): ReportItemView;
    getSiblingLine(line: ReportItemView, delta: number): ReportItemView;
    /**
     * @param index 0보다 작으면 뒤에서 부터. -1이면 마지막 line.
     */
    getLine(index: number): ReportItemView;
    getLines(): ReportItemView[];
    printAll(doc: Document, ctx: PrintContext): PageBodyOutput;
    itemOfDom(dom: Element): ReportItem;
    protected _getCssSelector(): string;
    get debugLabel(): string;
    get findable(): boolean;
    set findable(value: boolean);
    protected _debugBorder(): string;
    protected _debugColor(): string;
    protected _doMeasure(ctx: PrintContext, dom: HTMLElement, hintWidth: number, hintHeight: number): Size;
    protected _doLayoutContent(ctx: PrintContext): void;
    layoutFloating(ctx: PrintContext): void;
    private $_buildPages;
}
interface PageBodyOutput {
    startPage: number;
    pages: HTMLDivElement[][];
}

/** @internal */
declare class PageItemContainerElement extends BoundedContainerElement<PageItemContainer> {
    private _emptySize;
    private _findable;
    constructor(doc: Document, model: PageItemContainer, name: string, emptySize?: boolean);
    protected _doDispose(): void;
    get isLayer(): boolean;
    get findable(): boolean;
    set findable(value: boolean);
    get debugLabel(): string;
    get lazyLayout(): boolean;
    protected _getCssSelector(): string;
    protected _needDesignBox(): boolean;
    protected _isEmptySize(): boolean;
    protected _initDom(doc: Document, dom: HTMLElement): void;
    protected _prepareChild(child: ReportElement): void;
    protected _doMeasure(ctx: PrintContext, dom: HTMLElement, hintWidth: number, hintHeight: number): Size;
}

/** @internal */
declare class PageView extends LayerElement {
    private _model;
    private _reportHeaderView;
    private _reportFooterView;
    private _pageHeaderView;
    private _pageFooterView;
    private _bodyView;
    private _backView;
    private _frontView;
    private _sections;
    private _sectionGuard;
    constructor(doc: Document, printing?: boolean);
    protected _doDispose(): void;
    /** model */
    get model(): ReportPage;
    /** reportHeaderView */
    get reportHeaderView(): ReportHeaderElement;
    /** reportFooterView */
    get reportFooterView(): ReportFooterElement;
    /** pageHeaderView */
    get pageHeaderView(): PageHeaderElement;
    /** pageFooterView */
    get pageFooterView(): PageFooterElement;
    /** bodyView */
    get bodyView(): PageBodyElement;
    /** backFloatingView */
    get backFloatingView(): PageItemContainerElement;
    /** frontFloatingView */
    get frontFloatingView(): PageItemContainerElement;
    get sections(): ReportElement[];
    isPageDom(dom: HTMLElement): boolean;
    measure(ctx: PrintContext, bounds: Rectangle): ISize;
    layout(ctx: PrintContext, bounds: Rectangle): void;
    layoutFloating(ctx: PrintContext): void;
    afterRender(ctx: PrintContext): void;
    findElement(modelName: string): ReportElement;
    findElementOf(dom: HTMLElement): ReportElement;
    getElementOf(model: ReportItem): ReportElement;
    getAllElements(root: ReportElement, bounds: Rectangle): ReportItemView[];
    print(doc: Document, ctx: PrintContext, y: number): PrintPage[];
    getSections(): ReportElement[];
    /**
     * 페이지의 한 행을 전부 차지하는가?
     */
    isLine(view: ReportItemView): boolean;
    getFirst(): ReportItemView;
    getLast(): ReportItemView;
    getFirstInGroup(group: ReportGroupItemView): ReportItemView;
    getLastInGroup(group: ReportGroupItemView): ReportItemView;
    getPrev(elt: ReportItemView): ReportItemView;
    getNext(elt: ReportItemView): ReportItemView;
    getLeft(elt: ReportItemView): ReportItemView;
    getRight(elt: ReportItemView): ReportItemView;
    getUpper(elt: ReportItemView): ReportItemView;
    getLower(elt: ReportItemView): ReportItemView;
    itemOfDom(dom: Element): ReportItem;
    protected _getCssSelector(): string;
    private $_setModel;
}
/**
 * print page model.
 */
declare class PrintPage {
    page: HTMLDivElement;
    pageHeader: HTMLDivElement;
    pageFooter: HTMLDivElement;
    background: HTMLDivElement;
    contents: HTMLDivElement[];
    foreground: HTMLDivElement;
}

/** @internal */
declare class ReportView extends LayerElement implements IImageContainer {
    static readonly PAGE_HEAD = "rr-page-head";
    static readonly BACK_HEAD = "rr-back-head";
    static readonly FRONT_HEAD = "rr-front-head";
    private static ViewCreators;
    private _model;
    private _loadError;
    private _editable;
    private _emptyView;
    private _pageView;
    private _boxMeasurer;
    private _boxInner;
    private _nameMap;
    private _modelDirty;
    private _images;
    constructor(doc: Document, editable?: boolean, printing?: boolean);
    protected _doDispose(): void;
    addImage(url: string): void;
    imageLoaded(url: string): void;
    imagesAllLoaded(): boolean;
    /** editable */
    get editable(): boolean;
    /** model */
    get model(): Report;
    set model(value: Report);
    /** pageView */
    get pageView(): PageView;
    /** loadError */
    get loadError(): string;
    set loadError(value: string);
    get zoom(): number;
    getBoxPaddings(model: ReportItem): {
        left: number;
        right: number;
        top: number;
        bottom: number;
    };
    findElement(modelName: string): ReportElement;
    findElementOf(dom: HTMLElement): ReportElement;
    getElementOf(model: ReportItem): ReportElement;
    getItemBoundingRect(element: VisualElement): Rectangle;
    protected _getCssSelector(): string;
    protected _initDom(doc: Document, dom: HTMLElement): void;
    protected _createEmptyView(doc: Document): VisualElement;
    protected _layoutPageBorders(rReport: Rectangle, rPage: Rectangle): void;
    private $_layout;
    protected _afterLayout(ctx: PrintContext): void;
    private $_afterRender;
    private $_createElement;
    /**
     * PrintContainer.$_print(...)에서 호출한다.
     */
    private $_preparePrint;
    /**
     * PrintContainer.$_print(...)에서 호출한다.
     */
    private $_endPrint;
    protected _modelChanged(): void;
    protected onReportReset(report: Report): void;
    protected onReportPaperChanged(report: Report): void;
    protected onReportItemAdded(report: Report, item: ReportItem, index: number, silent: boolean): void;
    protected onReportItemRemoved(report: Report, item: ReportItem, oldParent: ReportGroupItem): void;
    protected onReportItemsRemoved(report: Report, items: ReportPageItem[]): void;
    protected onReportItemChanged(report: Report, item: ReportItem, prop: string, value: any, oldValue: any): void;
    protected onReportCommandStackChanged(report: Report, cmd: EditCommand): void;
}

/**
 * Printing 관련 상태 정보 모델.
 */
declare class PrintContext extends Base {
    private _printing;
    private _dp;
    private _desingDp;
    private _assets;
    private _reportView;
    private _pageWidth;
    private _pageHeight;
    private _date;
    private _pageCount;
    private _page;
    private _detailPageCount;
    private _detailPage;
    private _noValueCallback;
    report: Report;
    container: HTMLDivElement;
    headerHeight: number;
    footerHeight: number;
    reportHeaderHeight: number;
    reportFooterHeight: number;
    bodyTop: number;
    bodyBottom: number;
    bodyHeight: number;
    y: number;
    h: number;
    yBand: number;
    bandSummaryRuntime: DataBandSummaryRuntime;
    row: number;
    index: number;
    contextable: boolean;
    contextValues: ReportItemView[];
    private _userData;
    private _tags;
    constructor(printing?: boolean);
    /**
     * printing
     */
    get printing(): boolean;
    /**
     * data provider
     */
    get dp(): IReportDataProvider;
    set dp(value: IReportDataProvider);
    /**
     * design data provider
     */
    get designDp(): DesignDataManager;
    set designDp(value: DesignDataManager);
    /**
     * assets
     */
    get assets(): AssetManager;
    set assets(value: AssetManager);
    /**
     * reportView
     */
    get reportView(): ReportView;
    set reportView(value: ReportView);
    /**
     * pageWidth
     */
    get pageWidth(): number;
    set pageWidth(value: number);
    /**
     * pageHeight
     */
    get pageHeight(): number;
    set pageHeight(value: number);
    /**
     * date
     */
    get date(): Date;
    /**
     * page count.
     */
    get pageCount(): number;
    /**
     * page index.
     */
    get page(): number;
    /**
     * detail page count.
     */
    get detailPageCount(): number;
    /**
     * detail page index.
     */
    get detailPage(): number;
    preparePrint(report?: Report): void;
    preparePage(page: number): void;
    setDetailPage(count: number, page: number): void;
    finishPrint(pageCount: number): void;
    getUserData(): any;
    getCurrentValue(prop: string): any;
    setTag(tag: string, value: any): void;
    unsetTag(tag: string): void;
    getTag(tag: string, def?: any): any;
    getValue(data: string, row: number, field: string): any;
}
interface IReportData {
    name: string;
    isBand: boolean;
    getSaveType(): string;
    getSaveValues(): any;
    getValue(path: string): any;
}
interface IReportDataProvider {
    designTime?: boolean;
    preparePrint(ctx: PrintContext): void;
    getAll(): IReportData[];
    get(name: string): IReportData;
    getContextValue(path: string): any;
    getValue(path: string, row: number): any;
    getValueAt(data: string, path: string, row: number): any;
    getFieldValues(data: string, field: string): any[];
    addData?(data: IReportData): boolean;
    removeData?(data: string | IReportData): IReportData;
    dataNameChanged?(data: IReportData, oldName: string): void;
    fieldNameChanged?(data: IReportData, newName: string, oldName: string): void;
}
declare abstract class ReportData$1 extends Base {
    private _name;
    private _dp;
    constructor(name: string, dp: IReportDataProvider);
    get provider(): IReportDataProvider;
    get designTime(): boolean;
    get isBand(): boolean;
    /** name */
    get name(): string;
    set name(value: string);
    preparePrint(ctx: PrintContext, design: boolean): void;
}
/**
 * 단순형 값이나, json 객체를 값으로 지정한다.
 */
declare class SimpleData extends ReportData$1 implements IReportData {
    private _isObj;
    private _values;
    constructor(name: string, values: any);
    /**
     * TODO: array index
     */
    getValue(path?: string): any;
    get sample(): any;
    setSample(values: any): void;
    getFieldNames(): string[];
    getSaveType(): string;
    getSaveValues(): any;
}

interface IPrintReport {
    report: Report;
    data: IReportDataProvider;
}
/**
 */
declare class PrintContainer extends VisualContainer {
    static readonly CLASS_NAME = "rr-report-container";
    static readonly PREVIEW_CLASS = "rr-report-preview";
    private static readonly CONFIRM_CLASS;
    private _pageGap;
    private _zoom;
    private _align;
    private _styles;
    traceMode: boolean;
    onZoomed: (scale: number) => void;
    private _context;
    private _errorView;
    private _indicator;
    private _reportView;
    private _reportViews;
    private _contexts;
    private _pages;
    private _preview;
    private _previewId;
    constructor(containerId: string | HTMLDivElement);
    protected _doDispose(): void;
    /** pageCount */
    get pageCount(): number;
    /** page */
    get page(): number;
    set page(value: number);
    /** zoom */
    get zoom(): number;
    set zoom(value: number);
    get pages(): PrintPage[];
    print(report: Report | (Report | IPrintReport)[], data: IReportDataProvider, preview: boolean, id?: string): void;
    printSingle(report: Report, data: IReportDataProvider, preview: boolean, id?: string): void;
    printAll(reports: (Report | IPrintReport)[], data: IReportDataProvider, preview: boolean, id?: string): void;
    isAllRendered(): boolean;
    getPrintHtml(): string;
    setStyles(styles: any): void;
    fitToWidth(): void;
    fitToHeight(): void;
    fitToPage(): void;
    get printing(): boolean;
    protected _doPrepareContainer(dom: HTMLElement): void;
    protected _render(timestamp: number): void;
    protected _doResized(): void;
    private $_showError;
    private $_createIndicator;
    private $_print;
    private $_print2;
    private $_getContainer;
    private $_getPreviewer;
    private $_resetPreviewer;
    private $_buildOutput;
    private $_markRendered;
    private $_layoutFloatings;
}

interface PdfFont {
    file: string;
    name: string;
    content: string;
    style?: 'normal' | 'italic';
    weight?: 'normal' | 'bold';
}

declare enum CCITTScheme {
    GROUP_3 = "g3",
    GROUP_3_2D = "g3-2d",
    GROUP_4 = "g4"
}

interface ITiffOptions {
    dpi?: number;
    grayscale?: boolean;
    encoding?: CCITTScheme;
}

interface ImageExportOptions {
    type?: 'png' | 'jpeg' | 'jpg' | 'gif' | 'tif' | 'tiff';
    fileName?: string;
    zipName?: string;
    tiff?: ITiffOptions;
}

interface DocExportOptions {
    type: 'hwp' | 'docx';
    fileName?: string;
}

/**
 * ReportViewer base class
 */
declare abstract class ReportViewBase {
    protected _options: ReportOptions;
    protected _cm: boolean;
    protected _container: PrintContainer | undefined;
    protected _currentPage: number;
    constructor(container: string | HTMLDivElement, options?: ReportOptions);
    abstract preview(): void;
    abstract exportPdf(fonts: PdfFont[]): void;
    abstract exportImage(imageOptions: ImageExportOptions): void;
    abstract exportDocument(documentOptions: DocExportOptions): void;
    protected _checkPrintContainer(): void;
    get version(): string;
    get zoom(): number;
    set zoom(v: number);
    get pageCount(): number;
    get page(): number;
    set page(v: number);
    get reportHtml(): string;
    getHtml(): string;
    first(): void;
    prev(): void;
    next(): void;
    last(): void;
    zoomIn(scale?: number): void;
    zoomOut(scale?: number): void;
    fitToHeight(): void;
    fitToPage(): void;
    fitToWidth(): void;
    private $_checkL;
}

/**
 * RealReport Viewer
 */
declare class ReportViewer extends ReportViewBase {
    private _reportForm?;
    private _dataSet?;
    private _report;
    private _reportDataProvider;
    constructor(container: string | HTMLDivElement, reportForm?: ReportForm, dataSet?: ReportDataSet, options?: ReportOptions);
    get reportForm(): ReportForm;
    set reportForm(v: ReportForm);
    get dataSet(): ReportDataSet;
    set dataSet(v: any);
    /**
     * container에 리포트를 preview로 렌더링 합니다.
     */
    preview(): void;
    /**
     * PDF 내보내기 함수
     * @param fonts
     */
    exportPdf(fonts: PdfFont[]): void;
    /**
     * 이미지 내보내기 함수
     * @param imageOptions
     */
    exportImage(imageOptions?: ImageExportOptions): void;
    /**
     * 문서 내보내기 함수
     * @param documentOptions
     */
    exportDocument(documentOptions?: DocExportOptions): void;
    private _checkReport;
}

/**
 * RealReport Composite Viewer
 */
declare class ReportCompositeViewer extends ReportViewBase {
    private _reportFormSets?;
    private _reports;
    constructor(container: string | HTMLDivElement, formSets: ReportFormSet[], options?: ReportOptions);
    /**
     * container에 formsset을 preview로 렌더링 합니다.
     * 매핑 정보
     *   - form -> report
     */
    preview(): void;
    exportPdf(fonts: PdfFont[]): void;
    exportImage(imageOptions: ImageExportOptions): void;
    exportDocument(documentOptions: DocExportOptions): void;
    private _checkReportFormSet;
}

interface ReportOptions {
    zoom: number;
}
declare type ReportForm = Record<string, any>;
declare type ReportData = Record<string, any>;
declare type ReportDataSet = Record<string, ReportData>;
declare type ReportFormSet = {
    form: ReportForm;
    dataSet?: ReportDataSet;
};

export { ReportCompositeViewer, ReportData, ReportDataSet, ReportForm, ReportFormSet, ReportOptions, ReportViewer };
