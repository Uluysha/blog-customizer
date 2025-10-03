import { ArrowButton } from 'src/ui/arrow-button';
import { Button } from 'src/ui/button';
import {
	ArticleStateType,
	backgroundColors,
	contentWidthArr,
	defaultArticleState,
	fontColors,
	fontFamilyOptions,
	fontSizeOptions,
} from 'src/constants/articleProps';

import styles from './ArticleParamsForm.module.scss';
import { RadioGroup } from 'src/ui/radio-group';
import { Select } from 'src/ui/select';
import { Separator } from 'src/ui/separator';
import { Text } from 'src/ui/text';
import { FormEvent, useEffect, useRef, useState } from 'react';
import { saveArticleState } from 'src/index';
import clsx from 'clsx';

type TSpacing = '4px' | '24px' | '50px' | '90px' | '207px';

const Spacing = ({ spacing }: { spacing: TSpacing }) => {
	return <div style={{ padding: `calc(${spacing} / 2)` }} />;
};

type ArticleParamsFormProps = {
	articleState: ArticleStateType;
	onArticleStateChange: (changedState: ArticleStateType) => void;
	onArticleStateReset: () => void;
};

export const ArticleParamsForm = ({
	articleState,
	onArticleStateChange,
	onArticleStateReset,
}: ArticleParamsFormProps) => {
	const [isArrowButtonOpen, setArrowButtonOpen] = useState(false);
	const formReference = useRef<HTMLDivElement>(null);

	useEffect(() => {
		const clickOutsideHandler = (event: MouseEvent) => {
			if (
				isArrowButtonOpen &&
				formReference.current &&
				!formReference.current.contains(event.target as Node)
			) {
				setArrowButtonOpen(false);
			}
		};
		document.addEventListener('mousedown', clickOutsideHandler);
		return () => {
			document.removeEventListener('mousedown', clickOutsideHandler);
		};
	}, [isArrowButtonOpen]);

	const [fontFamilyOption, setFontFamilyOption] = useState(
		articleState.fontFamilyOption
	);

	const [fontSizeOption, setFontSizeOption] = useState(
		articleState.fontSizeOption
	);

	const [fontColorOption, setFontColorOption] = useState(
		articleState.fontColor
	);

	const [backgroundColorOption, setBackgroundColorOption] = useState(
		articleState.backgroundColor
	);

	const [contentWidthOption, setContentWidthOption] = useState(
		articleState.contentWidth
	);

	useEffect(() => {
		setFontFamilyOption(articleState.fontFamilyOption);
		setFontSizeOption(articleState.fontSizeOption);
		setFontColorOption(articleState.fontColor);
		setBackgroundColorOption(articleState.backgroundColor);
		setContentWidthOption(articleState.contentWidth);
	}, [articleState]);

	const formDataReset = () => {
		saveArticleState(defaultArticleState);
		onArticleStateReset();
	};

	const articleApply = (event: FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		const changedArticleState: ArticleStateType = {
			fontFamilyOption: fontFamilyOption,
			fontSizeOption: fontSizeOption,
			fontColor: fontColorOption,
			backgroundColor: backgroundColorOption,
			contentWidth: contentWidthOption,
		};
		saveArticleState(changedArticleState);
		onArticleStateChange(changedArticleState);
	};

	return (
		<div ref={formReference}>
			<ArrowButton
				isOpen={isArrowButtonOpen}
				onClick={() => setArrowButtonOpen(!isArrowButtonOpen)}
			/>
			<aside
				className={clsx(styles.container, {
					[styles.container_open]: isArrowButtonOpen,
				})}>
				<form className={styles.form} onSubmit={articleApply}>
					<Text as='h2' size={31} weight={800} uppercase={true}>
						Задайте параметры
					</Text>
					<Spacing spacing='50px' />
					<Select
						title='Шрифт'
						options={fontFamilyOptions}
						selected={fontFamilyOption}
						onChange={setFontFamilyOption}
					/>
					<Spacing spacing='50px' />
					<RadioGroup
						options={fontSizeOptions}
						selected={fontSizeOption}
						onChange={setFontSizeOption}
						name='fontSize'
						title='Размер шрифта'
					/>
					<Spacing spacing='50px' />
					<Select
						title='Цвет шрифта'
						options={fontColors}
						selected={fontColorOption}
						onChange={setFontColorOption}
					/>
					<Spacing spacing='50px' />
					<Separator />
					<Spacing spacing='50px' />
					<Select
						title='Цвет фона'
						options={backgroundColors}
						selected={backgroundColorOption}
						onChange={setBackgroundColorOption}
					/>
					<Spacing spacing='50px' />
					<Select
						title='Ширина контента'
						options={contentWidthArr}
						selected={contentWidthOption}
						onChange={setContentWidthOption}
					/>
					<Spacing spacing='207px' />
					<div className={styles.bottomContainer}>
						<Button
							title='Сбросить'
							htmlType='reset'
							type='clear'
							onClick={formDataReset}
						/>
						<Button title='Применить' htmlType='submit' type='apply' />
					</div>
				</form>
			</aside>
		</div>
	);
};
