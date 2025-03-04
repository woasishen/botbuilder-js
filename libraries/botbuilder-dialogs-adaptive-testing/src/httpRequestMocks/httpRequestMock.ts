/**
 * @module botbuilder-dialogs-adaptive-testing
 */
/**
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License.
 */

import { Configurable, Converter } from 'botbuilder-dialogs';
import { ResourceExplorer } from 'botbuilder-dialogs-declarative';

export abstract class HttpRequestMock extends Configurable {
    abstract setup(): void;
}

/**
 * The type converters for UserTokenMock.
 */
export class HttpRequestMocksConverter implements Converter<string[], HttpRequestMock[]> {
    constructor(private readonly _resourceExplorer: ResourceExplorer) {}

    convert(value: (string | HttpRequestMock)[]): HttpRequestMock[] {
        return value.map((item: string | HttpRequestMock) => {
            if (typeof item === 'string') {
                const httpRequestMock = this._resourceExplorer.loadType<HttpRequestMock>(`${item}.dialog`);
                if (httpRequestMock) {
                    return httpRequestMock;
                } else {
                    return this._resourceExplorer.loadType<HttpRequestMock>(item);
                }
            } else {
                const kind = item['$kind'];
                return this._resourceExplorer.buildType<HttpRequestMock, HttpRequestMock>(kind, item);
            }
        });
    }
}
