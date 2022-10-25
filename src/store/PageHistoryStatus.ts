import {Module, Mutation, VuexModule} from 'vuex-module-decorators';
import {HISTORY_PAGE} from '@/store/mutation-auth-types';

@Module({
  namespaced: true,
})
export default class PageHistoryStatus extends VuexModule {
  public history: string = '';

  get pageHistory(): string {
    return this.history;
  }

  @Mutation
  public [HISTORY_PAGE](pageName: string): void {
    this.history = pageName;
  }

}
