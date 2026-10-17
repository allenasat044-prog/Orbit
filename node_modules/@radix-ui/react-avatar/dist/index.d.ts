import * as _radix_ui_react_context from '@radix-ui/react-context';
import * as React from 'react';
import { Primitive } from '@radix-ui/react-primitive';

declare const createAvatarScope: _radix_ui_react_context.CreateScope;
declare const ImageLoadingStatus: {
    readonly Idle: "idle";
    readonly Loading: "loading";
    readonly Loaded: "loaded";
    readonly Error: "error";
};
type ImageLoadingStatus = (typeof ImageLoadingStatus)[keyof typeof ImageLoadingStatus];
type PrimitiveSpanProps = React.ComponentPropsWithoutRef<typeof Primitive.span>;
interface AvatarProps extends PrimitiveSpanProps {
}
declare const Avatar: React.ForwardRefExoticComponent<AvatarProps & React.RefAttributes<HTMLSpanElement>>;
type PrimitiveImageProps = React.ComponentPropsWithoutRef<typeof Primitive.img>;
interface AvatarImageProps extends PrimitiveImageProps {
    onLoadingStatusChange?: {
        bivarianceHack(status: ImageLoadingStatus): void;
    }['bivarianceHack'] | undefined;
}
declare const AvatarImage: React.ForwardRefExoticComponent<AvatarImageProps & React.RefAttributes<HTMLImageElement>>;
interface AvatarFallbackProps extends PrimitiveSpanProps {
    delayMs?: number | undefined;
}
declare const AvatarFallback: React.ForwardRefExoticComponent<AvatarFallbackProps & React.RefAttributes<HTMLSpanElement>>;

export { Avatar, AvatarFallback, type AvatarFallbackProps, AvatarImage, type AvatarImageProps, type AvatarProps, AvatarFallback as Fallback, AvatarImage as Image, Avatar as Root, createAvatarScope };
