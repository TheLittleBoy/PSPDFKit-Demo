//
//  PSPDFMagazineFolder.m
//  PSPDFKitExample
//
//  Created by Peter Steinberger on 7/22/11.
//  Copyright 2011 Peter Steinberger. All rights reserved.
//

#import "AppDelegate.h"
#import "PSPDFMagazineFolder.h"
#import "PSPDFMagazine.h"

@implementation PSPDFMagazineFolder

@synthesize magazines = magazines_;
@synthesize title;

///////////////////////////////////////////////////////////////////////////////////////////////////
#pragma mark -
#pragma mark Static

+ (PSPDFMagazineFolder *)folderWithTitle:(NSString *)title {
    PSPDFMagazineFolder *folder = [[[[self class] alloc] init] autorelease];
    folder.title = title;
    return folder;
}

///////////////////////////////////////////////////////////////////////////////////////////////////
#pragma mark -
#pragma mark Private

- (void)sortMagazines {
    [magazines_ sortUsingDescriptors:[NSArray arrayWithObject:[NSSortDescriptor sortDescriptorWithKey:@"uid" ascending:NO]]];
//    PSELog(@"sorted: %@", magazines_);
}

///////////////////////////////////////////////////////////////////////////////////////////////////
#pragma mark -
#pragma mark NSObject

- (id)init {
    if ((self = [super init])) {
        magazines_ = [[NSMutableArray alloc] init];
    }
    return self;
}

- (void)dealloc {
    for (PSPDFMagazine *magazine in magazines_) {
        magazine.folder = nil;
    }
    [magazines_ release];
    [super dealloc];
}

- (NSString *)description {
    NSString *description = [NSString stringWithFormat:@"<PSPDFMagazineFolder %@, %d magazines>", self.title, [self.magazines count]];
    return description;
}

- (NSUInteger)hash {
    return [self.title hash];
}

- (BOOL)isEqual:(id)other {
    if ([other isKindOfClass:[self class]]) {
        if (![self.title isEqual:[other title]] || !self.title || ![other title]) {
            return NO;
        }
        return YES;
    }
    else return NO;  
}

///////////////////////////////////////////////////////////////////////////////////////////////////
#pragma mark -
#pragma mark Public

- (BOOL)isSingleMagazine {
    return [self.magazines count] == 1; 
}

- (PSPDFMagazine *)firstMagazine {
    PSPDFMagazine *firstMagazine = [self.magazines count] ? [self.magazines objectAtIndex:0] : nil; 
    return firstMagazine;
}

- (void)addMagazine:(PSPDFMagazine *)magazine {
    [magazines_ addObject:magazine];
    magazine.folder = self;
    [self sortMagazines];
}

- (void)removeMagazine:(PSPDFMagazine *)magazine {
    magazine.folder = nil;
    [magazines_ removeObject:magazine];
    [self sortMagazines];
}

@end
