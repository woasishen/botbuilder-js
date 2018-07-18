/**
 * @module botbuilder-dialogs
 */
/**
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License.
 */
import { DialogTurnResult } from '../dialog';
import { DialogContext } from '../dialogContext';
import { Prompt, PromptOptions } from './prompt';
import * as prompts from 'botbuilder-prompts';
/**
 * Prompts a user to enter some text.
 *
 * @remarks
 * By default the prompt will return to the calling dialog a `string` representing the users reply.
 *
 * #### Prompt Usage
 *
 * When used with your bots `DialogSet` you can simply add a new instance of the prompt as a named
 * dialog using `DialogSet.add()`. You can then start the prompt from a waterfall step using either
 * `DialogContext.begin()` or `DialogContext.prompt()`. The user will be prompted with a question
 * and the response will be passed as an argument to the callers next waterfall step:
 *
 * ```JavaScript
 * const { DialogSet, TextPrompt } = require('botbuilder-dialogs');
 *
 * const dialogs = new DialogSet();
 *
 * dialogs.add('namePrompt', new TextPrompt());
 *
 * dialogs.add('askName', [
 *      async function (dc) {
 *          await dc.prompt('namePrompt', `What's your name?`);
 *      },
 *      async function (dc, name) {
 *          await dc.context.sendActivity(`Hi ${name}!`);
 *          await dc.end();
 *      }
 * ]);
 * ```
 * The prompt can be configured with a custom validator to perform additional checks like ensuring
 * that the user responds with a valid age and that only whole numbers are returned:
 *
 * ```JavaScript
 * dialogs.add('namePrompt', new TextPrompt(async (context, value) => {
 *    if (value && value.length >= 3) {
 *       return value;
 *    }
 *    await context.sendActivity(`Your entry must be at least 3 characters in length.`);
 *    return undefined;
 * }));
 * ```
 * @param O (Optional) output type returned by prompt. This defaults to a `string` but can be changed by a custom validator passed to the prompt.
 */
export declare class TextPrompt<O = string> extends Prompt {
    private prompt;
    /**
     * Creates a new `TextPrompt` instance.
     * @param validator (Optional) validator that will be called each time the user responds to the prompt. If the validator replies with a message no additional retry prompt will be sent.
     */
    constructor(validator?: prompts.PromptValidator<string, O>);
    protected onPrompt(dc: DialogContext, options: PromptOptions, isRetry: boolean): Promise<DialogTurnResult>;
    protected onRecognize(dc: DialogContext, options: PromptOptions): Promise<O | undefined>;
}
