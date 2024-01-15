import {
	ChevronLeftIcon,
	ChevronRightIcon,
	DotsHorizontalIcon,
	DoubleArrowLeftIcon,
	DoubleArrowRightIcon,
} from '@radix-ui/react-icons';
import type { ComponentProps, ReactElement } from 'react';
import { forwardRef } from 'react';

import type { ButtonProps } from './button';
import { buttonVariants } from './button';

import { cn } from '@/src/lib';

const Pagination = ({
	className,
	...props
}: ComponentProps<'nav'>): ReactElement => (
	<nav
		role="navigation"
		aria-label="pagination"
		className={cn('mx-auto flex w-full justify-center', className)}
		{...props}
	/>
);

const PaginationContent = forwardRef<HTMLUListElement, ComponentProps<'ul'>>(
	({ className, ...props }, ref) => (
		<ul
			ref={ref}
			className={cn('flex flex-row items-center gap-1', className)}
			{...props}
		/>
	),
);
PaginationContent.displayName = 'PaginationContent';

const PaginationItem = forwardRef<HTMLLIElement, ComponentProps<'li'>>(
	({ className, ...props }, ref) => (
		<li
			ref={ref}
			className={cn('', className)}
			{...props}
		/>
	),
);
PaginationItem.displayName = 'PaginationItem';

type PaginationLinkProps = {
	isActive?: boolean;
} & Pick<ButtonProps, 'size'> &
	ComponentProps<'a'>;

const PaginationLink = ({
	className,
	isActive,
	size = 'icon',
	...props
}: PaginationLinkProps): ReactElement => (
	<PaginationItem>
		<a
			aria-current={isActive ? 'page' : undefined}
			className={cn(
				buttonVariants({
					variant: isActive ? 'outline' : 'ghost',
					size,
				}),
				className,
			)}
			{...props}
		/>
	</PaginationItem>
);
PaginationLink.displayName = 'PaginationLink';

const PaginationPrevious = ({
	className,
	...props
}: ComponentProps<typeof PaginationLink>): ReactElement => (
	<PaginationLink
		aria-label="Go to previous page"
		size="icon"
		className={cn('gap-1', className)}
		{...props}
	>
		<ChevronLeftIcon className="h-4 w-4" />
	</PaginationLink>
);
PaginationPrevious.displayName = 'PaginationPrevious';

const PaginationFirst = ({
	className,
	...props
}: ComponentProps<typeof PaginationLink>): ReactElement => (
	<PaginationLink
		aria-label="Go to first page"
		size="icon"
		className={cn('gap-1', className)}
		{...props}
	>
		<DoubleArrowLeftIcon className="h-4 w-4" />
	</PaginationLink>
);

PaginationFirst.displayName = 'PaginationFirst';

const PaginationLast = ({
	className,
	...props
}: ComponentProps<typeof PaginationLink>): ReactElement => (
	<PaginationLink
		aria-label="Go to first page"
		size="icon"
		className={cn('gap-1', className)}
		{...props}
	>
		<DoubleArrowRightIcon className="h-4 w-4" />
	</PaginationLink>
);

PaginationLast.displayName = 'PaginationLast';

const PaginationNext = ({
	className,
	...props
}: ComponentProps<typeof PaginationLink>): ReactElement => (
	<PaginationLink
		aria-label="Go to next page"
		size="icon"
		className={cn('gap-1', className)}
		{...props}
	>
		<ChevronRightIcon className="h-4 w-4" />
	</PaginationLink>
);

const PaginationEllipsis = ({
	className,
	...props
}: ComponentProps<'span'>): ReactElement => (
	<span
		aria-hidden
		className={cn('flex h-9 w-9 items-center justify-center', className)}
		{...props}
	>
		<DotsHorizontalIcon className="h-4 w-4" />
		<span className="sr-only">More pages</span>
	</span>
);

export {
	Pagination,
	PaginationContent,
	PaginationEllipsis,
	PaginationFirst,
	PaginationItem,
	PaginationLast,
	PaginationLink,
	PaginationNext,
	PaginationPrevious,
};
