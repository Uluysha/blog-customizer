import { createRoot } from 'react-dom/client';
import { StrictMode, CSSProperties, useEffect, useState } from 'react';
import clsx from 'clsx';

import { Article } from './components/article/Article';
import { ArticleParamsForm } from './components/article-params-form/ArticleParamsForm';
import {
	ArticleStateType,
	defaultArticleState,
} from './constants/articleProps';

import './styles/index.scss';
import styles from './styles/index.module.scss';

const domNode = document.getElementById('root') as HTMLDivElement;
const root = createRoot(domNode);

export const ARTICLE_STATE_KEY = 'articleState';

export const saveArticleState = (state: ArticleStateType) => {
	try {
		localStorage.setItem(ARTICLE_STATE_KEY, JSON.stringify(state));
	} catch (error) {
		console.error('Ошибка установки состояния: ', error);
	}
};

export const getStorageArticleState = (): ArticleStateType => {
	try {
		const storageState = localStorage.getItem(ARTICLE_STATE_KEY);
		if (storageState) {
			return JSON.parse(storageState);
		}
	} catch (error) {
		console.error('Ошибка загрузки состояния: ', error);
	}
	return defaultArticleState;
};

const App = () => {
	const storageState = getStorageArticleState();
	const [articleState, setArticleState] =
		useState<ArticleStateType>(storageState);

	useEffect(() => {
		setArticleState(getStorageArticleState());
	}, []);

	useEffect(() => {
		saveArticleState(articleState);
	}, [articleState]);

	const onArticleStateChangeHandler = (changedState: ArticleStateType) => {
		setArticleState(changedState);
	};

	const onArticleStateResetHandler = () => {
		setArticleState(defaultArticleState);
	};
	return (
		<main
			className={clsx(styles.main)}
			style={
				{
					'--font-family': articleState.fontFamilyOption.value,
					'--font-size': articleState.fontSizeOption.value,
					'--font-color': articleState.fontColor.value,
					'--container-width': articleState.contentWidth.value,
					'--bg-color': articleState.backgroundColor.value,
				} as CSSProperties
			}>
			<ArticleParamsForm
				articleState={articleState}
				onArticleStateChange={onArticleStateChangeHandler}
				onArticleStateReset={onArticleStateResetHandler}
			/>
			<Article />
		</main>
	);
};

root.render(
	<StrictMode>
		<App />
	</StrictMode>
);
