import { readFile } from 'fs/promises';
import * as path from 'path';
import * as Mustache from 'mustache';

export class TemplateBuilder {

  public static async build(
    tmpl: string,
    args?: Record<string, unknown>,
  ): Promise<string> {
    const newArgs = args ?? {};
    if (['{{', '}}'].every((brackets) => tmpl.includes(brackets))) {
      return Mustache.render(tmpl, { data: newArgs });
    }

    const template = await readFile(
      path.join(process.cwd(), 'templates', tmpl),
      {
        encoding: 'utf-8',
      },
    );
    return Mustache.render(template, { data: newArgs });
  }

}
