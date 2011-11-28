//
//  PSPDFScrollView.h
//  PSPDFKit
//
//  Copyright 2011 Peter Steinberger. All rights reserved.
//

@class PSPDFDocument, PSPDFTilingView, PSPDFPageView, PSPDFViewController;

/// Scrollview for a single page. Every PSPDFPageView is embedded in a PSPDFScrollView.
@interface PSPDFScrollView : UIScrollView <UIScrollViewDelegate>

/// display specific document with specified page.
- (void)displayDocument:(PSPDFDocument *)aDocument withPage:(NSUInteger)pageId;

/// prepares reuse of internal data.
- (void)prepareForReuse;

/// releases document, removes all caches. Call before releasing. Can be called multiple times w/o error.
- (void)releaseDocument;

// for memory warning relay.
- (void)didReceiveMemoryWarning;

// internal use for smooth rotations.
- (void)switchPages;

/// weak reference to parent pdfController.
@property(nonatomic, assign) PSPDFViewController *pdfController;

/// current displayed page.
@property(nonatomic, assign) NSUInteger page;

/// actual view that gets zoomed. attach your views here instead of the PSPDFScrollView to get them zoomed.
@property(nonatomic, retain, readonly) UIView *compoundView;

/// if YES, two sites are displayed.
@property (nonatomic, assign, getter=isDualPageMode) BOOL dualPageMode;

/// shows first document page alone. Not relevant in PSPDFPageModeSinge.
@property(nonatomic, assign) BOOL doublePageModeOnFirstPage;

/// allow zooming of small documents to screen width/height.
@property(nonatomic, assign, getter=isZoomingSmallDocumentsEnabled) BOOL zoomingSmallDocumentsEnabled;

/// if true, pages are fit to screen width, not to either height or width (which one is larger - usually height)
@property(nonatomic, assign, getter=isFittingWidth) BOOL fitWidth;

/// enables/disables page shadow.
@property(nonatomic, assign, getter=isShadowEnabled) BOOL shadowEnabled;

/// tap on begin/end of page scrolls to previous/next page.
@property(nonatomic, assign, getter=isScrollOnTapPageEndEnabled) BOOL scrollOnTapPageEndEnabled;

/// show/hide tiled layer.
@property(nonatomic, assign, getter=isRotationActive) BOOL rotationActive;

/// left page. Always set.
@property(nonatomic, retain, readonly) PSPDFPageView *leftPage;

/// right page, if doublePageMode is enabled.
@property(nonatomic, retain, readonly) PSPDFPageView *rightPage;

/// for subclassing - allows changing the shadow path.
- (CGPathRef)renderPaperCurl:(UIView*)imgView;

@end
