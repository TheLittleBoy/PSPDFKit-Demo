//
//  PSPFScrobbleBar.h
//  PSPDFKit
//
//  Created by Peter Steinberger on 07.04.11.
//  Copyright 2011 Peter Steinberger. All rights reserved.
//

#import "PSPDFCache.h"

// Scrobble bar like iBooks
@interface PSPDFScrobbleBar : UIToolbar <PSPDFCacheDelegate> {
    PSPDFViewController *pdfController_;
    NSUInteger page_;
    NSInteger pageMarkerPage_;
    NSUInteger thumbCount_;
    
    UIImageView *positionImage_;
    NSMutableDictionary *imageViews_;
}

- (id)initWithPDFController:(PSPDFViewController *)pdfController;

// updates toolbar, realigns page screenshots
- (void)updateToolbar;

// current selected page
@property(nonatomic, assign) NSUInteger page;

@property(nonatomic, assign, readonly) PSPDFViewController *pdfController;

@end
