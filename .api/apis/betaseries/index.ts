import type * as types from './types';
import type { ConfigOptions, FetchResponse } from 'api/dist/core'
import Oas from 'oas';
import APICore from 'api/dist/core';
import definition from './openapi.json';

class SDK {
  spec: Oas;
  core: APICore;

  constructor() {
    this.spec = Oas.init(definition);
    this.core = new APICore(this.spec, 'betaseries/3.0 (api/6.1.2)');
  }

  /**
   * Optionally configure various options that the SDK allows.
   *
   * @param config Object of supported SDK options and toggles.
   * @param config.timeout Override the default `fetch` request timeout of 30 seconds. This number
   * should be represented in milliseconds.
   */
  config(config: ConfigOptions) {
    this.core.setConfig(config);
  }

  /**
   * If the API you're using requires authentication you can supply the required credentials
   * through this method and the library will magically determine how they should be used
   * within your API request.
   *
   * With the exception of OpenID and MutualTLS, it supports all forms of authentication
   * supported by the OpenAPI specification.
   *
   * @example <caption>HTTP Basic auth</caption>
   * sdk.auth('username', 'password');
   *
   * @example <caption>Bearer tokens (HTTP or OAuth 2)</caption>
   * sdk.auth('myBearerToken');
   *
   * @example <caption>API Keys</caption>
   * sdk.auth('myApiKey');
   *
   * @see {@link https://spec.openapis.org/oas/v3.0.3#fixed-fields-22}
   * @see {@link https://spec.openapis.org/oas/v3.1.0#fixed-fields-22}
   * @param values Your auth credentials for the API; can specify up to two strings or numbers.
   */
  auth(...values: string[] | number[]) {
    this.core.setAuth(...values);
    return this;
  }

  /**
   * If the API you're using offers alternate server URLs, and server variables, you can tell
   * the SDK which one to use with this method. To use it you can supply either one of the
   * server URLs that are contained within the OpenAPI definition (along with any server
   * variables), or you can pass it a fully qualified URL to use (that may or may not exist
   * within the OpenAPI definition).
   *
   * @example <caption>Server URL with server variables</caption>
   * sdk.server('https://{region}.api.example.com/{basePath}', {
   *   name: 'eu',
   *   basePath: 'v14',
   * });
   *
   * @example <caption>Fully qualified server URL</caption>
   * sdk.server('https://eu.api.example.com/v14');
   *
   * @param url Server URL
   * @param variables An object of variables to replace into the server URL.
   */
  server(url: string, variables = {}) {
    this.core.setServer(url, variables);
  }

  /**
   * Returns a badge details.
   *
   * @summary Returns badge details
   */
  getBadgesBadge(metadata: types.GetBadgesBadgeMetadataParam): Promise<FetchResponse<number, unknown>> {
    return this.core.fetch('/badges/badge', 'get', metadata);
  }

  /**
   * Display collection's data.
   *
   * @summary Display collection's data
   */
  getCollectionsCollection(metadata: types.GetCollectionsCollectionMetadataParam): Promise<FetchResponse<number, unknown>> {
    return this.core.fetch('/collections/collection', 'get', metadata);
  }

  /**
   * Deletes a collection from the identified user. [Premium feature]
   *
   * @summary Delete a collection from the identified user [Premium feature]
   */
  deleteCollectionsCollection(metadata: types.DeleteCollectionsCollectionMetadataParam): Promise<FetchResponse<number, unknown>> {
    return this.core.fetch('/collections/collection', 'delete', metadata);
  }

  /**
   * Create/Update a collection for the identified user. [Premium feature]
   *
   * @summary Create/Update a collection for the identified user [Premium feature]
   */
  postCollectionsCollection(metadata?: types.PostCollectionsCollectionMetadataParam): Promise<FetchResponse<number, unknown>> {
    return this.core.fetch('/collections/collection', 'post', metadata);
  }

  /**
   * Display the list of all collections of the member.
   *
   * @summary Display the list of all collections of the member
   */
  getCollectionsList(metadata?: types.GetCollectionsListMetadataParam): Promise<FetchResponse<number, unknown>> {
    return this.core.fetch('/collections/list', 'get', metadata);
  }

  /**
   * Retrieves comments for a given element.
   *
   * @summary Get comments
   */
  getCommentsComments(metadata: types.GetCommentsCommentsMetadataParam): Promise<FetchResponse<number, unknown>> {
    return this.core.fetch('/comments/comments', 'get', metadata);
  }

  /**
   * Retrieves a given comment.
   *
   * @summary Retrieve a given comment
   */
  getCommentsComment(metadata: types.GetCommentsCommentMetadataParam): Promise<FetchResponse<number, unknown>> {
    return this.core.fetch('/comments/comment', 'get', metadata);
  }

  /**
   * Creates or edits a comment for the specified item.
   *
   * @summary Create or edit a comment for the specified item
   */
  postCommentsComment(metadata: types.PostCommentsCommentMetadataParam): Promise<FetchResponse<number, unknown>> {
    return this.core.fetch('/comments/comment', 'post', metadata);
  }

  /**
   * Deletes a comment from the identified user.
   *
   * @summary Delete a comment from the identified user
   */
  deleteCommentsComment(metadata: types.DeleteCommentsCommentMetadataParam): Promise<FetchResponse<number, unknown>> {
    return this.core.fetch('/comments/comment', 'delete', metadata);
  }

  /**
   * Retrieves the replies of a given comment.
   *
   * @summary Retrieve the replies of a given comment
   */
  getCommentsReplies(metadata: types.GetCommentsRepliesMetadataParam): Promise<FetchResponse<number, unknown>> {
    return this.core.fetch('/comments/replies', 'get', metadata);
  }

  /**
   * Creates a comment for an event.
   *
   * @summary Create a comment for an event
   */
  postCommentsCommentEvent(metadata?: types.PostCommentsCommentEventMetadataParam): Promise<FetchResponse<number, unknown>> {
    return this.core.fetch('/comments/comment_event', 'post', metadata);
  }

  /**
   * Subscribes the member to email notifications for the given item.
   *
   * @summary Subscribe the member to email notifications for the given item
   */
  postCommentsSubscription(metadata?: types.PostCommentsSubscriptionMetadataParam): Promise<FetchResponse<number, unknown>> {
    return this.core.fetch('/comments/subscription', 'post', metadata);
  }

  /**
   * Unsubscribes the member from email notifications for the given item.
   *
   * @summary Unsubscribe the member from email notifications for the given item
   */
  deleteCommentsSubscription(metadata?: types.DeleteCommentsSubscriptionMetadataParam): Promise<FetchResponse<number, unknown>> {
    return this.core.fetch('/comments/subscription', 'delete', metadata);
  }

  /**
   * Adds a vote for the user for the given comment.
   *
   * @summary Add a vote for the user for the given comment
   */
  postCommentsThumb(metadata: types.PostCommentsThumbMetadataParam): Promise<FetchResponse<number, unknown>> {
    return this.core.fetch('/comments/thumb', 'post', metadata);
  }

  /**
   * Removes the user's vote for the given comment.
   *
   * @summary Remove the user's vote for the given comment
   */
  deleteCommentsThumb(metadata: types.DeleteCommentsThumbMetadataParam): Promise<FetchResponse<number, unknown>> {
    return this.core.fetch('/comments/thumb', 'delete', metadata);
  }

  /**
   * Retrieves the status of comments on the given item (closed or open).
   *
   * @summary Retrieve the status of comments on the given item (closed or open)
   */
  getCommentsStatus(metadata?: types.GetCommentsStatusMetadataParam): Promise<FetchResponse<number, unknown>> {
    return this.core.fetch('/comments/status', 'get', metadata);
  }

  /**
   * Rate an episode with a score from 1 to 5.
   *
   * @summary Rate an episode
   */
  postEpisodesNote(metadata?: types.PostEpisodesNoteMetadataParam): Promise<FetchResponse<number, unknown>> {
    return this.core.fetch('/episodes/note', 'post', metadata);
  }

  /**
   * Delete an episode's rating.
   *
   * @summary Remove a rating
   */
  deleteEpisodesNote(metadata?: types.DeleteEpisodesNoteMetadataParam): Promise<FetchResponse<number, unknown>> {
    return this.core.fetch('/episodes/note', 'delete', metadata);
  }

  /**
   * Fetch the list of episodes to watch, with various filters and pagination options.
   *
   * @summary Retrieve the list of episodes to watch.
   */
  getEpisodesList(metadata?: types.GetEpisodesListMetadataParam): Promise<FetchResponse<number, unknown>> {
    return this.core.fetch('/episodes/list', 'get', metadata);
  }

  /**
   * Indicate an episode has been downloaded.
   *
   * @summary Mark an episode as downloaded
   */
  postEpisodesDownloaded(metadata?: types.PostEpisodesDownloadedMetadataParam): Promise<FetchResponse<number, unknown>> {
    return this.core.fetch('/episodes/downloaded', 'post', metadata);
  }

  /**
   * Unmark an episode as downloaded.
   *
   * @summary Remove the downloaded mark
   */
  deleteEpisodesDownloaded(metadata?: types.DeleteEpisodesDownloadedMetadataParam): Promise<FetchResponse<number, unknown>> {
    return this.core.fetch('/episodes/downloaded', 'delete', metadata);
  }

  /**
   * Mark one or more episodes as watched, with options to specify multiple episodes, bulk
   * marking, and deletion of future episode marks.
   *
   * @summary Mark an episode as watched
   */
  postEpisodesWatched(metadata?: types.PostEpisodesWatchedMetadataParam): Promise<FetchResponse<number, unknown>> {
    return this.core.fetch('/episodes/watched', 'post', metadata);
  }

  /**
   * Remove the watched mark from one or more episodes, allowing for multiple episodes to be
   * specified.
   *
   * @summary Unmark an episode as watched
   */
  deleteEpisodesWatched(metadata?: types.DeleteEpisodesWatchedMetadataParam): Promise<FetchResponse<number, unknown>> {
    return this.core.fetch('/episodes/watched', 'delete', metadata);
  }

  /**
   * Show details of one or more episodes, allowing for multiple IDs and various information
   * sources.
   *
   * @summary Display information of an episode
   */
  getEpisodesDisplay(metadata?: types.GetEpisodesDisplayMetadataParam): Promise<FetchResponse<number, unknown>> {
    return this.core.fetch('/episodes/display', 'get', metadata);
  }

  /**
   * Fetch episode details from a given file name.
   *
   * @summary Retrieve episode information
   */
  getEpisodesScraper(metadata?: types.GetEpisodesScraperMetadataParam): Promise<FetchResponse<number, unknown>> {
    return this.core.fetch('/episodes/scraper', 'get', metadata);
  }

  /**
   * Fetch episode details based on series ID, URL, episode number, or subtitles.
   *
   * @summary Retrieve episode information
   */
  getEpisodesSearch(metadata?: types.GetEpisodesSearchMetadataParam): Promise<FetchResponse<number, unknown>> {
    return this.core.fetch('/episodes/search', 'get', metadata);
  }

  /**
   * Fetch the most recently aired episode of a specific series.
   *
   * @summary Retrieve the latest aired episode
   */
  getEpisodesLatest(metadata?: types.GetEpisodesLatestMetadataParam): Promise<FetchResponse<number, unknown>> {
    return this.core.fetch('/episodes/latest', 'get', metadata);
  }

  /**
   * Fetch the upcoming episode of a specific series.
   *
   * @summary Retrieve the next episode
   */
  getEpisodesNext(metadata?: types.GetEpisodesNextMetadataParam): Promise<FetchResponse<number, unknown>> {
    return this.core.fetch('/episodes/next', 'get', metadata);
  }

  /**
   * Indicate an episode or multiple episodes as not to be watched.
   *
   * @summary Mark an episode as not to watch
   */
  postEpisodesHidden(metadata?: types.PostEpisodesHiddenMetadataParam): Promise<FetchResponse<number, unknown>> {
    return this.core.fetch('/episodes/hidden', 'post', metadata);
  }

  /**
   * Unmark an episode or multiple episodes from being hidden.
   *
   * @summary Remove an episode from the hidden list
   */
  deleteEpisodesHidden(metadata?: types.DeleteEpisodesHiddenMetadataParam): Promise<FetchResponse<number, unknown>> {
    return this.core.fetch('/episodes/hidden', 'delete', metadata);
  }

  /**
   * Fetch the list of episodes that have been watched but not yet rated.
   *
   * @summary Retrieve the list of watched and unrated episodes
   */
  getEpisodesUnrated(metadata?: types.GetEpisodesUnratedMetadataParam): Promise<FetchResponse<number, unknown>> {
    return this.core.fetch('/episodes/unrated', 'get', metadata);
  }

  /**
   * Retrieves the list of friends of the member.
   *
   * @summary Retrieves friends List
   */
  getFriendsList(metadata?: types.GetFriendsListMetadataParam): Promise<FetchResponse<number, unknown>> {
    return this.core.fetch('/friends/list', 'get', metadata);
  }

  /**
   * Retrieves the list of requests sent by the user.
   *
   * @summary Retrieves sent requests
   */
  getFriendsRequests(metadata?: types.GetFriendsRequestsMetadataParam): Promise<FetchResponse<number, unknown>> {
    return this.core.fetch('/friends/requests', 'get', metadata);
  }

  /**
   * Adds a friend to the user's account.
   *
   * @summary Adds a friend
   */
  postFriendsFriend(metadata?: types.PostFriendsFriendMetadataParam): Promise<FetchResponse<number, unknown>> {
    return this.core.fetch('/friends/friend', 'post', metadata);
  }

  /**
   * Removes a friend from the user's account.
   *
   * @summary Removes a friend
   */
  deleteFriendsFriend(metadata?: types.DeleteFriendsFriendMetadataParam): Promise<FetchResponse<number, unknown>> {
    return this.core.fetch('/friends/friend', 'delete', metadata);
  }

  /**
   * Blocks a user.
   *
   * @summary Blocks a user
   */
  postFriendsBlock(metadata?: types.PostFriendsBlockMetadataParam): Promise<FetchResponse<number, unknown>> {
    return this.core.fetch('/friends/block', 'post', metadata);
  }

  /**
   * Unblocks a user.
   *
   * @summary Unblocks a user
   */
  deleteFriendsBlock(metadata?: types.DeleteFriendsBlockMetadataParam): Promise<FetchResponse<number, unknown>> {
    return this.core.fetch('/friends/block', 'delete', metadata);
  }

  /**
   * Deletes the filter for the connected member for the type of media.
   *
   * @summary Deletes filter
   */
  deleteProfileFiltersFilter(metadata?: types.DeleteProfileFiltersFilterMetadataParam): Promise<FetchResponse<number, unknown>> {
    return this.core.fetch('/profile-filters/filter', 'delete', metadata);
  }

  /**
   * Retrieves member options (subtitles).
   *
   * @summary Retrieves member options
   */
  getMembersOptions(metadata?: types.GetMembersOptionsMetadataParam): Promise<FetchResponse<number, unknown>> {
    return this.core.fetch('/members/options', 'get', metadata);
  }

  /**
   * Standard member authentication.
   *
   * @summary Standard member authentication
   */
  postMembersAuth(metadata?: types.PostMembersAuthMetadataParam): Promise<FetchResponse<number, unknown>> {
    return this.core.fetch('/members/auth', 'post', metadata);
  }

  /**
   * OAuth authentication. Redirects the user to the callback URL specified in your account
   * with the GET parameter token.
   *
   * @summary OAuth Authentication
   */
  postMembersOauth(metadata?: types.PostMembersOauthMetadataParam): Promise<FetchResponse<number, unknown>> {
    return this.core.fetch('/members/oauth', 'post', metadata);
  }

  /**
   * Retrieves an access token with the code provided by OAuth 2 authentication.
   *
   * @summary OAuth2 Access Token
   */
  postMembersAccessToken(metadata?: types.PostMembersAccessTokenMetadataParam): Promise<FetchResponse<number, unknown>> {
    return this.core.fetch('/members/access_token', 'post', metadata);
  }

  /**
   * Returns information of a member, defaulting to the identified member. Use movies/member
   * to retrieve movies and shows/member for series.
   *
   * @summary Returns member information
   */
  getMembersInfos(metadata?: types.GetMembersInfosMetadataParam): Promise<FetchResponse<number, unknown>> {
    return this.core.fetch('/members/infos', 'get', metadata);
  }

  /**
   * Returns available username options on BetaSeries.
   *
   * @summary Returns available usernames
   */
  getMembersUsername(metadata?: types.GetMembersUsernameMetadataParam): Promise<FetchResponse<number, unknown>> {
    return this.core.fetch('/members/username', 'get', metadata);
  }

  /**
   * Modifies a user option.
   *
   * @summary Modifies user option
   */
  postMembersOption(metadata?: types.PostMembersOptionMetadataParam): Promise<FetchResponse<number, unknown>> {
    return this.core.fetch('/members/option', 'post', metadata);
  }

  /**
   * Checks if the token is active.
   *
   * @summary Checks token activity
   */
  getMembersIsActive(metadata?: types.GetMembersIsActiveMetadataParam): Promise<FetchResponse<number, unknown>> {
    return this.core.fetch('/members/is_active', 'get', metadata);
  }

  /**
   * Destroys the active token.
   *
   * @summary Destroys active token
   */
  postMembersDestroy(metadata?: types.PostMembersDestroyMetadataParam): Promise<FetchResponse<number, unknown>> {
    return this.core.fetch('/members/destroy', 'post', metadata);
  }

  /**
   * Displays member badges.
   *
   * @summary Displays member badges
   */
  getMembersBadges(metadata?: types.GetMembersBadgesMetadataParam): Promise<FetchResponse<number, unknown>> {
    return this.core.fetch('/members/badges', 'get', metadata);
  }

  /**
   * Displays the latest member notifications. Types: badge, banner, bugs, character,
   * comment, donations, episode, facebook, film, forum, friend, message, quiz, recommend,
   * site, subtitles, video.
   *
   * @summary Displays latest notifications
   */
  getMembersNotifications(metadata?: types.GetMembersNotificationsMetadataParam): Promise<FetchResponse<number, unknown>> {
    return this.core.fetch('/members/notifications', 'get', metadata);
  }

  /**
   * Deletes a notification.
   *
   * @summary Deletes a notification
   */
  deleteMembersNotification(metadata?: types.DeleteMembersNotificationMetadataParam): Promise<FetchResponse<number, unknown>> {
    return this.core.fetch('/members/notification', 'delete', metadata);
  }

  /**
   * Creates a new member account on BetaSeries.
   *
   * @summary Creates new member account
   */
  postMembersSignup(metadata?: types.PostMembersSignupMetadataParam): Promise<FetchResponse<number, unknown>> {
    return this.core.fetch('/members/signup', 'post', metadata);
  }

  /**
   * Searches for members.
   *
   * @summary Member search
   */
  getMembersSearch(metadata?: types.GetMembersSearchMetadataParam): Promise<FetchResponse<number, unknown>> {
    return this.core.fetch('/members/search', 'get', metadata);
  }

  /**
   * Searches members among the account's friends.
   *
   * @summary Searches members among friends
   */
  postMembersSync(metadata?: types.PostMembersSyncMetadataParam): Promise<FetchResponse<number, unknown>> {
    return this.core.fetch('/members/sync', 'post', metadata);
  }

  /**
   * Sends an email to reset the password.
   *
   * @summary Password reset email
   */
  postMembersLost(metadata?: types.PostMembersLostMetadataParam): Promise<FetchResponse<number, unknown>> {
    return this.core.fetch('/members/lost', 'post', metadata);
  }

  /**
   * Uploads and replaces the identified user's avatar.
   *
   * @summary Uploads and replaces user avatar
   */
  postMembersAvatar(metadata?: types.PostMembersAvatarMetadataParam): Promise<FetchResponse<number, unknown>> {
    return this.core.fetch('/members/avatar', 'post', metadata);
  }

  /**
   * Deletes the identified user's avatar.
   *
   * @summary Deletes user avatar
   */
  deleteMembersAvatar(metadata?: types.DeleteMembersAvatarMetadataParam): Promise<FetchResponse<number, unknown>> {
    return this.core.fetch('/members/avatar', 'delete', metadata);
  }

  /**
   * Uploads and replaces the identified user's banner.
   *
   * @summary Uploads user banner
   */
  postMembersBanner(metadata?: types.PostMembersBannerMetadataParam): Promise<FetchResponse<number, unknown>> {
    return this.core.fetch('/members/banner', 'post', metadata);
  }

  /**
   * Delete the banner of the identified user.
   *
   * @summary Remove the banner
   */
  deleteMembersBanner(metadata?: types.DeleteMembersBannerMetadataParam): Promise<FetchResponse<number, unknown>> {
    return this.core.fetch('/members/banner', 'delete', metadata);
  }

  /**
   * Set a new locale for the identified member.
   *
   * @summary Change the locale
   */
  postMembersLocale(metadata?: types.PostMembersLocaleMetadataParam): Promise<FetchResponse<number, unknown>> {
    return this.core.fetch('/members/locale', 'post', metadata);
  }

  /**
   * Fetch the email address of the identified member.
   *
   * @summary Retrieve the email address
   */
  getMembersEmail(metadata?: types.GetMembersEmailMetadataParam): Promise<FetchResponse<number, unknown>> {
    return this.core.fetch('/members/email', 'get', metadata);
  }

  /**
   * Update the email address of the identified member.
   *
   * @summary Change the email address
   */
  postMembersEmail(metadata?: types.PostMembersEmailMetadataParam): Promise<FetchResponse<number, unknown>> {
    return this.core.fetch('/members/email', 'post', metadata);
  }

  /**
   * Update the password for the identified member.
   *
   * @summary Change the password
   */
  postMembersPassword(metadata?: types.PostMembersPasswordMetadataParam): Promise<FetchResponse<number, unknown>> {
    return this.core.fetch('/members/password', 'post', metadata);
  }

  /**
   * Returns the year's statistics of a member, defaulting to the identified member.
   *
   * @summary Returns yearly member statistics
   */
  getMembersYear(metadata?: types.GetMembersYearMetadataParam): Promise<FetchResponse<number, unknown>> {
    return this.core.fetch('/members/year', 'get', metadata);
  }

  /**
   * Initiates the account deletion process (sends an email with a link for permanent
   * deletion).
   *
   * @summary Initiates account deletion process
   */
  postMembersDelete(metadata?: types.PostMembersDeleteMetadataParam): Promise<FetchResponse<number, unknown>> {
    return this.core.fetch('/members/delete', 'post', metadata);
  }

  /**
   * Fetch the inbox of the identified member, paginated by 20 messages.
   *
   * @summary Retrieve the member's inbox
   */
  getMessagesInbox(metadata?: types.GetMessagesInboxMetadataParam): Promise<FetchResponse<number, unknown>> {
    return this.core.fetch('/messages/inbox', 'get', metadata);
  }

  /**
   * Fetch a discussion using the ID of its first message.
   *
   * @summary Retrieve a discussion
   */
  getMessagesDiscussion(metadata?: types.GetMessagesDiscussionMetadataParam): Promise<FetchResponse<number, unknown>> {
    return this.core.fetch('/messages/discussion', 'get', metadata);
  }

  /**
   * Mark a specific message as read.
   *
   * @summary Mark a message as read
   */
  postMessagesRead(metadata?: types.PostMessagesReadMetadataParam): Promise<FetchResponse<number, unknown>> {
    return this.core.fetch('/messages/read', 'post', metadata);
  }

  /**
   * Delete a specific message. If it's the first in a discussion, the entire discussion is
   * deleted.
   *
   * @summary Delete a message
   */
  deleteMessagesMessage(metadata?: types.DeleteMessagesMessageMetadataParam): Promise<FetchResponse<number, unknown>> {
    return this.core.fetch('/messages/message', 'delete', metadata);
  }

  /**
   * Send a message to a fellow member of the site.
   *
   * @summary Send a message
   */
  postMessagesMessage(metadata?: types.PostMessagesMessageMetadataParam): Promise<FetchResponse<number, unknown>> {
    return this.core.fetch('/messages/message', 'post', metadata);
  }

  /**
   * Display the details of a movie from either its own ID, TheMovieDB ID, or IMDB ID.
   *
   * @summary Show movie details
   */
  getMoviesMovie(metadata?: types.GetMoviesMovieMetadataParam): Promise<FetchResponse<number, unknown>> {
    return this.core.fetch('/movies/movie', 'get', metadata);
  }

  /**
   * Add or update the movie in the member's movie list.
   *
   * @summary Add or update a movie
   */
  postMoviesMovie(metadata?: types.PostMoviesMovieMetadataParam): Promise<FetchResponse<number, unknown>> {
    return this.core.fetch('/movies/movie', 'post', metadata);
  }

  /**
   * Delete a movie from the member's account.
   *
   * @summary Remove a movie
   */
  deleteMoviesMovie(metadata?: types.DeleteMoviesMovieMetadataParam): Promise<FetchResponse<number, unknown>> {
    return this.core.fetch('/movies/movie', 'delete', metadata);
  }

  /**
   * Show the complete list of movies.
   *
   * @summary Display the list of all movies
   */
  getMoviesList(metadata?: types.GetMoviesListMetadataParam): Promise<FetchResponse<number, unknown>> {
    return this.core.fetch('/movies/list', 'get', metadata);
  }

  /**
   * Show the complete list of movies of a member.
   *
   * @summary Display all movies of a member
   */
  getMoviesMember(metadata?: types.GetMoviesMemberMetadataParam): Promise<FetchResponse<number, unknown>> {
    return this.core.fetch('/movies/member', 'get', metadata);
  }

  /**
   * Show a randomly selected movie.
   *
   * @summary Display a random movie
   */
  getMoviesRandom(metadata?: types.GetMoviesRandomMetadataParam): Promise<FetchResponse<number, unknown>> {
    return this.core.fetch('/movies/random', 'get', metadata);
  }

  /**
   * Search for a movie based on various criteria.
   *
   * @summary Search for a movie
   */
  getMoviesSearch(metadata?: types.GetMoviesSearchMetadataParam): Promise<FetchResponse<number, unknown>> {
    return this.core.fetch('/movies/search', 'get', metadata);
  }

  /**
   * Get movie details by processing the given file name.
   *
   * @summary Retrieve movie information
   */
  getMoviesScraper(metadata?: types.GetMoviesScraperMetadataParam): Promise<FetchResponse<number, unknown>> {
    return this.core.fetch('/movies/scraper', 'get', metadata);
  }

  /**
   * Show all available movie genres.
   *
   * @summary Display all available genres
   */
  getMoviesGenres(metadata?: types.GetMoviesGenresMetadataParam): Promise<FetchResponse<number, unknown>> {
    return this.core.fetch('/movies/genres', 'get', metadata);
  }

  /**
   * Give a rating to a movie.
   *
   * @summary Rate a movie
   */
  postMoviesNote(metadata?: types.PostMoviesNoteMetadataParam): Promise<FetchResponse<number, unknown>> {
    return this.core.fetch('/movies/note', 'post', metadata);
  }

  /**
   * Delete a given rating from a movie.
   *
   * @summary Remove a movie rating
   */
  deleteMoviesNote(metadata?: types.DeleteMoviesNoteMetadataParam): Promise<FetchResponse<number, unknown>> {
    return this.core.fetch('/movies/note', 'delete', metadata);
  }

  /**
   * Show movies marked as similar by BetaSeries members.
   *
   * @summary Retrieve similar movies
   */
  getMoviesSimilars(metadata?: types.GetMoviesSimilarsMetadataParam): Promise<FetchResponse<number, unknown>> {
    return this.core.fetch('/movies/similars', 'get', metadata);
  }

  /**
   * Show the casting details of the movie.
   *
   * @summary Retrieve the cast of the movie.
   */
  getMoviesCharacters(metadata?: types.GetMoviesCharactersMetadataParam): Promise<FetchResponse<number, unknown>> {
    return this.core.fetch('/movies/characters', 'get', metadata);
  }

  /**
   * Show the favorite movies of a member.
   *
   * @summary Retrieve favorite movies
   */
  getMoviesFavorites(metadata?: types.GetMoviesFavoritesMetadataParam): Promise<FetchResponse<number, unknown>> {
    return this.core.fetch('/movies/favorites', 'get', metadata);
  }

  /**
   * Add a favorite movie to the profile of the identified member.
   *
   * @summary Add a favorite movie
   */
  postMoviesFavorite(metadata?: types.PostMoviesFavoriteMetadataParam): Promise<FetchResponse<number, unknown>> {
    return this.core.fetch('/movies/favorite', 'post', metadata);
  }

  /**
   * Remove a favorite movie from the profile of the identified member.
   *
   * @summary Remove a favorite movie
   */
  deleteMoviesFavorite(metadata?: types.DeleteMoviesFavoriteMetadataParam): Promise<FetchResponse<number, unknown>> {
    return this.core.fetch('/movies/favorite', 'delete', metadata);
  }

  /**
   * Display the list of upcoming movies in theaters.
   *
   * @summary Display upcoming movies
   */
  getMoviesUpcoming(metadata?: types.GetMoviesUpcomingMetadataParam): Promise<FetchResponse<number, unknown>> {
    return this.core.fetch('/movies/upcoming', 'get', metadata);
  }

  /**
   * Display the list of movies to discover.
   *
   * @summary Display movies to discover
   */
  getMoviesDiscover(metadata?: types.GetMoviesDiscoverMetadataParam): Promise<FetchResponse<number, unknown>> {
    return this.core.fetch('/movies/discover', 'get', metadata);
  }

  /**
   * Display blog articles that talk about the movie.
   *
   * @summary Display blog articles about the movie
   */
  getMoviesArticles(metadata?: types.GetMoviesArticlesMetadataParam): Promise<FetchResponse<number, unknown>> {
    return this.core.fetch('/movies/articles', 'get', metadata);
  }

  /**
   * Display the latest news around series.
   *
   * @summary Display the latest news
   */
  getNewsLast(metadata?: types.GetNewsLastMetadataParam): Promise<FetchResponse<number, unknown>> {
    return this.core.fetch('/news/last', 'get', metadata);
  }

  /**
   * Retrieves an access token with the code provided by OAuth 2 authentication.
   *
   * @summary Retrieve an access token with the code provided by OAuth 2 authentication
   */
  postOauthAccessToken(metadata?: types.PostOauthAccessTokenMetadataParam): Promise<FetchResponse<number, unknown>> {
    return this.core.fetch('/oauth/access_token', 'post', metadata);
  }

  /**
   * Retrieves a code to present to the user for identification on a remote device (e.g.,
   * Television).
   *
   * @summary Retrieve a code to present to the user for identification on a remote device (e.g.,
   * Television)
   */
  postOauthDevice(metadata?: types.PostOauthDeviceMetadataParam): Promise<FetchResponse<number, unknown>> {
    return this.core.fetch('/oauth/device', 'post', metadata);
  }

  /**
   * Display the details of the actor.
   *
   * @summary Display details of the actor
   */
  getPersonsPerson(metadata?: types.GetPersonsPersonMetadataParam): Promise<FetchResponse<number, unknown>> {
    return this.core.fetch('/persons/person', 'get', metadata);
  }

  /**
   * Display news articles that talk about the person.
   *
   * @summary Display news articles
   */
  getPersonsArticles(metadata?: types.GetPersonsArticlesMetadataParam): Promise<FetchResponse<number, unknown>> {
    return this.core.fetch('/persons/articles', 'get', metadata);
  }

  /**
   * Returns a picture of the member.
   *
   * @summary Return a picture of the member
   */
  getPicturesMembers(metadata: types.GetPicturesMembersMetadataParam): Promise<FetchResponse<number, unknown>> {
    return this.core.fetch('/pictures/members', 'get', metadata);
  }

  /**
   * Returns a picture of the episode.
   *
   * @summary Return a picture of the episode
   */
  getPicturesEpisodes(metadata: types.GetPicturesEpisodesMetadataParam): Promise<FetchResponse<number, unknown>> {
    return this.core.fetch('/pictures/episodes', 'get', metadata);
  }

  /**
   * Returns a picture of the show.
   *
   * @summary Return a picture of the show
   */
  getPicturesShows(metadata: types.GetPicturesShowsMetadataParam): Promise<FetchResponse<number, unknown>> {
    return this.core.fetch('/pictures/shows', 'get', metadata);
  }

  /**
   * Returns an image of the badge (32x32).
   *
   * @summary Return an image of the badge (32x32)
   */
  getPicturesBadges(metadata: types.GetPicturesBadgesMetadataParam): Promise<FetchResponse<number, unknown>> {
    return this.core.fetch('/pictures/badges', 'get', metadata);
  }

  /**
   * Returns an image of the character.
   *
   * @summary Return an image of the character
   */
  getPicturesCharacters(metadata: types.GetPicturesCharactersMetadataParam): Promise<FetchResponse<number, unknown>> {
    return this.core.fetch('/pictures/characters', 'get', metadata);
  }

  /**
   * Returns an image of the person.
   *
   * @summary Return an image of the person
   */
  getPicturesPersons(metadata: types.GetPicturesPersonsMetadataParam): Promise<FetchResponse<number, unknown>> {
    return this.core.fetch('/pictures/persons', 'get', metadata);
  }

  /**
   * Returns an image of the movie.
   *
   * @summary Return an image of the movie
   */
  getPicturesMovies(metadata: types.GetPicturesMoviesMetadataParam): Promise<FetchResponse<number, unknown>> {
    return this.core.fetch('/pictures/movies', 'get', metadata);
  }

  /**
   * Returns an image of the season of the show.
   *
   * @summary Return an image of the show's season
   */
  getPicturesSeasons(metadata: types.GetPicturesSeasonsMetadataParam): Promise<FetchResponse<number, unknown>> {
    return this.core.fetch('/pictures/seasons', 'get', metadata);
  }

  /**
   * Returns an image of the SVOD or VOD platform.
   *
   * @summary Return an image of the SVOD or VOD platform
   */
  getPicturesPlatforms(metadata: types.GetPicturesPlatformsMetadataParam): Promise<FetchResponse<number, unknown>> {
    return this.core.fetch('/pictures/platforms', 'get', metadata);
  }

  /**
   * Display all episodes broadcasted in the last 8 days and up to the next 8 days.
   *
   * @summary Display all episodes broadcasted
   */
  getPlanningGeneral(metadata?: types.GetPlanningGeneralMetadataParam): Promise<FetchResponse<number, unknown>> {
    return this.core.fetch('/planning/general', 'get', metadata);
  }

  /**
   * Display the schedule of the identified member or another member.
   *
   * @summary Display the schedule
   */
  getPlanningMember(metadata?: types.GetPlanningMemberMetadataParam): Promise<FetchResponse<number, unknown>> {
    return this.core.fetch('/planning/member', 'get', metadata);
  }

  /**
   * Display only the first episode of the upcoming series to be broadcasted.
   *
   * @summary Display only the first episode of the upcoming series
   */
  getPlanningIncoming(metadata?: types.GetPlanningIncomingMetadataParam): Promise<FetchResponse<number, unknown>> {
    return this.core.fetch('/planning/incoming', 'get', metadata);
  }

  /**
   * Display the SVOD and VOD platforms available in the country.
   *
   * @summary Display the SVOD and VOD platforms available in the country
   */
  getPlatformsList(metadata?: types.GetPlatformsListMetadataParam): Promise<FetchResponse<number, unknown>> {
    return this.core.fetch('/platforms/list', 'get', metadata);
  }

  /**
   * Display the different services a user can have.
   *
   * @summary Display the different services a user can have
   */
  getPlatformsServices(metadata?: types.GetPlatformsServicesMetadataParam): Promise<FetchResponse<number, unknown>> {
    return this.core.fetch('/platforms/services', 'get', metadata);
  }

  /**
   * Add the service to the user's subscriptions.
   *
   * @summary Add the service to the user's subscriptions
   */
  postPlatformsService(metadata?: types.PostPlatformsServiceMetadataParam): Promise<FetchResponse<number, unknown>> {
    return this.core.fetch('/platforms/service', 'post', metadata);
  }

  /**
   * Remove the service from the user's subscriptions.
   *
   * @summary Remove the service from the user's subscriptions
   */
  deletePlatformsService(metadata?: types.DeletePlatformsServiceMetadataParam): Promise<FetchResponse<number, unknown>> {
    return this.core.fetch('/platforms/service', 'delete', metadata);
  }

  /**
   * Display the latest active poll on BetaSeries.
   *
   * @summary Display the latest active poll
   */
  getPollsLast(metadata?: types.GetPollsLastMetadataParam): Promise<FetchResponse<number, unknown>> {
    return this.core.fetch('/polls/last', 'get', metadata);
  }

  /**
   * Display the details of the poll with the given ID.
   *
   * @summary Display the details of a poll
   */
  getPollsPoll(metadata?: types.GetPollsPollMetadataParam): Promise<FetchResponse<number, unknown>> {
    return this.core.fetch('/polls/poll', 'get', metadata);
  }

  /**
   * Display the latest active poll regarding the target.
   *
   * @summary Display the latest active poll
   */
  getPollsTarget(metadata?: types.GetPollsTargetMetadataParam): Promise<FetchResponse<number, unknown>> {
    return this.core.fetch('/polls/target', 'get', metadata);
  }

  /**
   * Display all polls of BetaSeries.
   *
   * @summary Display all polls
   */
  getPollsList(metadata?: types.GetPollsListMetadataParam): Promise<FetchResponse<number, unknown>> {
    return this.core.fetch('/polls/list', 'get', metadata);
  }

  /**
   * Send a response to a poll.
   *
   * @summary Send a response to a poll
   */
  postPollsAnswer(metadata?: types.PostPollsAnswerMetadataParam): Promise<FetchResponse<number, unknown>> {
    return this.core.fetch('/polls/answer', 'post', metadata);
  }

  /**
   * Create a report for the element.
   *
   * @summary Create a report for the element
   */
  postReportsReport(metadata?: types.PostReportsReportMetadataParam): Promise<FetchResponse<number, unknown>> {
    return this.core.fetch('/reports/report', 'post', metadata);
  }

  /**
   * Request an update for the element.
   *
   * @summary Request an update for the element
   */
  postReportsUpdate(metadata?: types.PostReportsUpdateMetadataParam): Promise<FetchResponse<number, unknown>> {
    return this.core.fetch('/reports/update', 'post', metadata);
  }

  /**
   * Return search results for all types of elements.
   *
   * @summary Return search results for all types of elements.
   */
  getSearchAll(metadata?: types.GetSearchAllMetadataParam): Promise<FetchResponse<number, unknown>> {
    return this.core.fetch('/search/all', 'get', metadata);
  }

  /**
   * Return series search results with advanced filters.
   *
   * @summary Return series search results with advanced filters.
   */
  getSearchShows(metadata?: types.GetSearchShowsMetadataParam): Promise<FetchResponse<number, unknown>> {
    return this.core.fetch('/search/shows', 'get', metadata);
  }

  /**
   * Return movie search results with advanced filters.
   *
   * @summary Return movie search results with advanced filters.
   */
  getSearchMovies(metadata?: types.GetSearchMoviesMetadataParam): Promise<FetchResponse<number, unknown>> {
    return this.core.fetch('/search/movies', 'get', metadata);
  }

  /**
   * Mark all episodes of a season as watched. Skips already watched episodes.
   *
   * @summary Mark all episodes of a season as watched
   */
  postSeasonsWatched(metadata?: types.PostSeasonsWatchedMetadataParam): Promise<FetchResponse<number, unknown>> {
    return this.core.fetch('/seasons/watched', 'post', metadata);
  }

  /**
   * Remove all episodes of a season from watched. Skips episodes not yet watched.
   *
   * @summary Remove all episodes of a season from watched
   */
  deleteSeasonsWatched(metadata?: types.DeleteSeasonsWatchedMetadataParam): Promise<FetchResponse<number, unknown>> {
    return this.core.fetch('/seasons/watched', 'delete', metadata);
  }

  /**
   * Mark all episodes of a season as hidden. Skips already watched episodes.
   *
   * @summary Mark all episodes of a season as hidden
   */
  postSeasonsHide(metadata?: types.PostSeasonsHideMetadataParam): Promise<FetchResponse<number, unknown>> {
    return this.core.fetch('/seasons/hide', 'post', metadata);
  }

  /**
   * Remove all episodes of a season from hidden. Skips already watched episodes.
   *
   * @summary Remove all episodes of a season from hidden
   */
  deleteSeasonsHide(metadata?: types.DeleteSeasonsHideMetadataParam): Promise<FetchResponse<number, unknown>> {
    return this.core.fetch('/seasons/hide', 'delete', metadata);
  }

  /**
   * Rate a season.
   *
   * @summary Rate a season
   */
  postSeasonsNote(metadata?: types.PostSeasonsNoteMetadataParam): Promise<FetchResponse<number, unknown>> {
    return this.core.fetch('/seasons/note', 'post', metadata);
  }

  /**
   * Remove a rating from a season.
   *
   * @summary Remove a rating from a season
   */
  deleteSeasonsNote(metadata?: types.DeleteSeasonsNoteMetadataParam): Promise<FetchResponse<number, unknown>> {
    return this.core.fetch('/seasons/note', 'delete', metadata);
  }

  /**
   * Rate a series.
   *
   * @summary Rate a series
   */
  postShowsNote(metadata: types.PostShowsNoteMetadataParam): Promise<FetchResponse<number, unknown>> {
    return this.core.fetch('/shows/note', 'post', metadata);
  }

  /**
   * Delete a series rating.
   *
   * @summary Delete a series rating
   */
  deleteShowsNote(metadata?: types.DeleteShowsNoteMetadataParam): Promise<FetchResponse<number, unknown>> {
    return this.core.fetch('/shows/note', 'delete', metadata);
  }

  /**
   * Search for a series, with member information if a token is provided.
   *
   * @summary Search for a series, with member information if a token is provided
   */
  getShowsSearch(metadata?: types.GetShowsSearchMetadataParam): Promise<FetchResponse<number, unknown>> {
    return this.core.fetch('/shows/search', 'get', metadata);
  }

  /**
   * Display information about a series.
   *
   * @summary Display information about a series
   */
  getShowsDisplay(metadata?: types.GetShowsDisplayMetadataParam): Promise<FetchResponse<number, unknown>> {
    return this.core.fetch('/shows/display', 'get', metadata);
  }

  /**
   * Display the list of all series.
   *
   * @summary Display the list of all series
   */
  getShowsList(metadata?: types.GetShowsListMetadataParam): Promise<FetchResponse<number, unknown>> {
    return this.core.fetch('/shows/list', 'get', metadata);
  }

  /**
   * Display a random series.
   *
   * @summary Display a random series
   */
  getShowsRandom(metadata?: types.GetShowsRandomMetadataParam): Promise<FetchResponse<number, unknown>> {
    return this.core.fetch('/shows/random', 'get', metadata);
  }

  /**
   * Display episodes of a series.
   *
   * @summary Display episodes of a series
   */
  getShowsEpisodes(metadata?: types.GetShowsEpisodesMetadataParam): Promise<FetchResponse<number, unknown>> {
    return this.core.fetch('/shows/episodes', 'get', metadata);
  }

  /**
   * Add a series to the member's account.
   *
   * @summary Add a series to the member's account
   */
  postShowsShow(metadata?: types.PostShowsShowMetadataParam): Promise<FetchResponse<number, unknown>> {
    return this.core.fetch('/shows/show', 'post', metadata);
  }

  /**
   * Remove a series from the member's account.
   *
   * @summary Remove a series from the member's account
   */
  deleteShowsShow(metadata?: types.DeleteShowsShowMetadataParam): Promise<FetchResponse<number, unknown>> {
    return this.core.fetch('/shows/show', 'delete', metadata);
  }

  /**
   * Archive a series in the member's account.
   *
   * @summary Archive a series in the member's account
   */
  postShowsArchive(metadata?: types.PostShowsArchiveMetadataParam): Promise<FetchResponse<number, unknown>> {
    return this.core.fetch('/shows/archive', 'post', metadata);
  }

  /**
   * Remove a series from the archives of the member's account.
   *
   * @summary Remove a series from the archives of the member's account
   */
  deleteShowsArchive(metadata?: types.DeleteShowsArchiveMetadataParam): Promise<FetchResponse<number, unknown>> {
    return this.core.fetch('/shows/archive', 'delete', metadata);
  }

  /**
   * Create a series recommendation from a member to a friend.
   *
   * @summary Create a series recommendation from a member to a friend
   */
  postShowsRecommendation(metadata?: types.PostShowsRecommendationMetadataParam): Promise<FetchResponse<number, unknown>> {
    return this.core.fetch('/shows/recommendation', 'post', metadata);
  }

  /**
   * Delete a sent or received series recommendation.
   *
   * @summary Delete a sent or received series recommendation
   */
  deleteShowsRecommendation(metadata?: types.DeleteShowsRecommendationMetadataParam): Promise<FetchResponse<number, unknown>> {
    return this.core.fetch('/shows/recommendation', 'delete', metadata);
  }

  /**
   * Change the status of a received series recommendation.
   *
   * @summary Change the status of a received series recommendation
   */
  putShowsRecommendation(metadata?: types.PutShowsRecommendationMetadataParam): Promise<FetchResponse<number, unknown>> {
    return this.core.fetch('/shows/recommendation', 'put', metadata);
  }

  /**
   * Retrieve recommendations received by the identified user.
   *
   * @summary Retrieve recommendations received by the identified user
   */
  getShowsRecommendations(metadata?: types.GetShowsRecommendationsMetadataParam): Promise<FetchResponse<number, unknown>> {
    return this.core.fetch('/shows/recommendations', 'get', metadata);
  }

  /**
   * Retrieve series marked as similar.
   *
   * @summary Retrieve series marked as similar
   */
  getShowsSimilars(metadata?: types.GetShowsSimilarsMetadataParam): Promise<FetchResponse<number, unknown>> {
    return this.core.fetch('/shows/similars', 'get', metadata);
  }

  /**
   * Retrieve videos associated with the series.
   *
   * @summary Retrieve videos associated with the series
   */
  getShowsVideos(metadata?: types.GetShowsVideosMetadataParam): Promise<FetchResponse<number, unknown>> {
    return this.core.fetch('/shows/videos', 'get', metadata);
  }

  /**
   * Retrieve characters of the series
   *
   * @summary Retrieve characters of the series
   */
  getShowsCharacters(metadata?: types.GetShowsCharactersMetadataParam): Promise<FetchResponse<number, unknown>> {
    return this.core.fetch('/shows/characters', 'get', metadata);
  }

  /**
   * Retrieve images of the series
   *
   * @summary Retrieve images of the series
   */
  getShowsPictures(metadata?: types.GetShowsPicturesMetadataParam): Promise<FetchResponse<number, unknown>> {
    return this.core.fetch('/shows/pictures', 'get', metadata);
  }

  /**
   * Retrieve the favorite series of the member.
   *
   * @summary Retrieve the favorite series of the member
   */
  getShowsFavorites(metadata?: types.GetShowsFavoritesMetadataParam): Promise<FetchResponse<number, unknown>> {
    return this.core.fetch('/shows/favorites', 'get', metadata);
  }

  /**
   * Add a favorite series to the profile of the identified member.
   *
   * @summary Add a favorite series to the profile of the identified member
   */
  postShowsFavorite(metadata?: types.PostShowsFavoriteMetadataParam): Promise<FetchResponse<number, unknown>> {
    return this.core.fetch('/shows/favorite', 'post', metadata);
  }

  /**
   * Remove a favorite series from the profile of the identified member.
   *
   * @summary Remove a favorite series from the profile of the identified member
   */
  deleteShowsFavorite(metadata?: types.DeleteShowsFavoriteMetadataParam): Promise<FetchResponse<number, unknown>> {
    return this.core.fetch('/shows/favorite', 'delete', metadata);
  }

  /**
   * Update tags for the given series of the identified member.
   *
   * @summary Update tags for the given series of the identified member
   */
  postShowsTags(metadata?: types.PostShowsTagsMetadataParam): Promise<FetchResponse<number, unknown>> {
    return this.core.fetch('/shows/tags', 'post', metadata);
  }

  /**
   * Display the list of all series of the member.
   *
   * @summary Display the list of all series of the member
   */
  getShowsMember(metadata?: types.GetShowsMemberMetadataParam): Promise<FetchResponse<number, unknown>> {
    return this.core.fetch('/shows/member', 'get', metadata);
  }

  /**
   * Display the list of series to discover.
   *
   * @summary Display the list of series to discover
   */
  getShowsDiscover(metadata?: types.GetShowsDiscoverMetadataParam): Promise<FetchResponse<number, unknown>> {
    return this.core.fetch('/shows/discover', 'get', metadata);
  }

  /**
   * Display the list of series to discover on major SVoD platforms.
   *
   * @summary Display the list of series to discover on major SVoD platforms
   */
  getShowsDiscoverPlatforms(metadata?: types.GetShowsDiscoverPlatformsMetadataParam): Promise<FetchResponse<number, unknown>> {
    return this.core.fetch('/shows/discover_platforms', 'get', metadata);
  }

  /**
   * Display the list of available series genres.
   *
   * @summary Display the list of available series genres
   */
  getShowsGenres(metadata?: types.GetShowsGenresMetadataParam): Promise<FetchResponse<number, unknown>> {
    return this.core.fetch('/shows/genres', 'get', metadata);
  }

  /**
   * Display the seasons of the series.
   *
   * @summary Display the seasons of the series
   */
  getShowsSeasons(metadata?: types.GetShowsSeasonsMetadataParam): Promise<FetchResponse<number, unknown>> {
    return this.core.fetch('/shows/seasons', 'get', metadata);
  }

  /**
   * Display blog articles that talk about the series.
   *
   * @summary Display blog articles that talk about the series
   */
  getShowsArticles(metadata?: types.GetShowsArticlesMetadataParam): Promise<FetchResponse<number, unknown>> {
    return this.core.fetch('/shows/articles', 'get', metadata);
  }

  /**
   * Retrieve the list of finished and unrated series.
   *
   * @summary Retrieve the list of finished and unrated series
   */
  getShowsUnrated(metadata?: types.GetShowsUnratedMetadataParam): Promise<FetchResponse<number, unknown>> {
    return this.core.fetch('/shows/unrated', 'get', metadata);
  }

  /**
   * Displays the latest subtitles retrieved by BetaSeries.
   *
   * @summary Display the latest subtitles retrieved by BetaSeries
   */
  getSubtitlesLast(metadata?: types.GetSubtitlesLastMetadataParam): Promise<FetchResponse<number, unknown>> {
    return this.core.fetch('/subtitles/last', 'get', metadata);
  }

  /**
   * Displays subtitles for a given show.
   *
   * @summary Display subtitles for a given show
   */
  getSubtitlesShow(metadata: types.GetSubtitlesShowMetadataParam): Promise<FetchResponse<number, unknown>> {
    return this.core.fetch('/subtitles/show', 'get', metadata);
  }

  /**
   * Displays subtitles for a given episode.
   *
   * @summary Display subtitles for a given episode
   */
  getSubtitlesEpisode(metadata: types.GetSubtitlesEpisodeMetadataParam): Promise<FetchResponse<number, unknown>> {
    return this.core.fetch('/subtitles/episode', 'get', metadata);
  }

  /**
   * Displays subtitles for a specific season or all seasons.
   *
   * @summary Display subtitles for a season or all seasons
   */
  getSubtitlesSeason(metadata: types.GetSubtitlesSeasonMetadataParam): Promise<FetchResponse<number, unknown>> {
    return this.core.fetch('/subtitles/season', 'get', metadata);
  }

  /**
   * Reports subtitles as incorrect to be removed from the list.
   *
   * @summary Reports subtitles as incorrect to be removed from the list.
   */
  postSubtitlesReport(metadata: types.PostSubtitlesReportMetadataParam): Promise<FetchResponse<number, unknown>> {
    return this.core.fetch('/subtitles/report', 'post', metadata);
  }

  /**
   * Displays all the tags created by the connected member.
   *
   * @summary Display all tags created by the connected member
   */
  getTagsList(metadata?: types.GetTagsListMetadataParam): Promise<FetchResponse<number, unknown>> {
    return this.core.fetch('/tags/list', 'get', metadata);
  }

  /**
   * Adds a tag (or several) for the show (or the movie) for the connected member.
   *
   * @summary Add a tag (or several) for the show (or movie) for the connected member
   */
  postTagsTag(metadata?: types.PostTagsTagMetadataParam): Promise<FetchResponse<number, unknown>> {
    return this.core.fetch('/tags/tag', 'post', metadata);
  }

  /**
   * Removes a tag for the show (or the movie) for the connected member.
   *
   * @summary Remove a tag for the show (or movie) for the connected member
   */
  deleteTagsTag(metadata?: types.DeleteTagsTagMetadataParam): Promise<FetchResponse<number, unknown>> {
    return this.core.fetch('/tags/tag', 'delete', metadata);
  }

  /**
   * Displays the latest events on the site.
   *
   * @summary Display the latest events on the site
   */
  getTimelineHome(metadata?: types.GetTimelineHomeMetadataParam): Promise<FetchResponse<number, unknown>> {
    return this.core.fetch('/timeline/home', 'get', metadata);
  }

  /**
   * Displays the latest events of the friends of the identified member.
   *
   * @summary Display the latest events of the friends of the identified member
   */
  getTimelineFeed(metadata?: types.GetTimelineFeedMetadataParam): Promise<FetchResponse<number, unknown>> {
    return this.core.fetch('/timeline/feed', 'get', metadata);
  }

  /**
   * Displays the latest events of the friends of the identified member.
   *
   * @summary Display the latest events of the friends of the identified member
   */
  getTimelineFriends(metadata?: types.GetTimelineFriendsMetadataParam): Promise<FetchResponse<number, unknown>> {
    return this.core.fetch('/timeline/friends', 'get', metadata);
  }

  /**
   * Displays the latest events of the specified member.
   *
   * @summary Display the latest events of the specified member
   */
  getTimelineMember(metadata: types.GetTimelineMemberMetadataParam): Promise<FetchResponse<number, unknown>> {
    return this.core.fetch('/timeline/member', 'get', metadata);
  }

  /**
   * Displays a particular event.
   *
   * @summary Display a particular event
   */
  getTimelineEvent(metadata: types.GetTimelineEventMetadataParam): Promise<FetchResponse<number, unknown>> {
    return this.core.fetch('/timeline/event', 'get', metadata);
  }

  /**
   * Displays the latest events of the connected member on the specified series.
   *
   * @summary Display the latest events of the connected member about the specified show
   */
  getTimelineShow(metadata?: types.GetTimelineShowMetadataParam): Promise<FetchResponse<number, unknown>> {
    return this.core.fetch('/timeline/show', 'get', metadata);
  }
}

const createSDK = (() => { return new SDK(); })()
;

export default createSDK;

export type { DeleteCollectionsCollectionMetadataParam, DeleteCommentsCommentMetadataParam, DeleteCommentsSubscriptionMetadataParam, DeleteCommentsThumbMetadataParam, DeleteEpisodesDownloadedMetadataParam, DeleteEpisodesHiddenMetadataParam, DeleteEpisodesNoteMetadataParam, DeleteEpisodesWatchedMetadataParam, DeleteFriendsBlockMetadataParam, DeleteFriendsFriendMetadataParam, DeleteMembersAvatarMetadataParam, DeleteMembersBannerMetadataParam, DeleteMembersNotificationMetadataParam, DeleteMessagesMessageMetadataParam, DeleteMoviesFavoriteMetadataParam, DeleteMoviesMovieMetadataParam, DeleteMoviesNoteMetadataParam, DeletePlatformsServiceMetadataParam, DeleteProfileFiltersFilterMetadataParam, DeleteSeasonsHideMetadataParam, DeleteSeasonsNoteMetadataParam, DeleteSeasonsWatchedMetadataParam, DeleteShowsArchiveMetadataParam, DeleteShowsFavoriteMetadataParam, DeleteShowsNoteMetadataParam, DeleteShowsRecommendationMetadataParam, DeleteShowsShowMetadataParam, DeleteTagsTagMetadataParam, GetBadgesBadgeMetadataParam, GetCollectionsCollectionMetadataParam, GetCollectionsListMetadataParam, GetCommentsCommentMetadataParam, GetCommentsCommentsMetadataParam, GetCommentsRepliesMetadataParam, GetCommentsStatusMetadataParam, GetEpisodesDisplayMetadataParam, GetEpisodesLatestMetadataParam, GetEpisodesListMetadataParam, GetEpisodesNextMetadataParam, GetEpisodesScraperMetadataParam, GetEpisodesSearchMetadataParam, GetEpisodesUnratedMetadataParam, GetFriendsListMetadataParam, GetFriendsRequestsMetadataParam, GetMembersBadgesMetadataParam, GetMembersEmailMetadataParam, GetMembersInfosMetadataParam, GetMembersIsActiveMetadataParam, GetMembersNotificationsMetadataParam, GetMembersOptionsMetadataParam, GetMembersSearchMetadataParam, GetMembersUsernameMetadataParam, GetMembersYearMetadataParam, GetMessagesDiscussionMetadataParam, GetMessagesInboxMetadataParam, GetMoviesArticlesMetadataParam, GetMoviesCharactersMetadataParam, GetMoviesDiscoverMetadataParam, GetMoviesFavoritesMetadataParam, GetMoviesGenresMetadataParam, GetMoviesListMetadataParam, GetMoviesMemberMetadataParam, GetMoviesMovieMetadataParam, GetMoviesRandomMetadataParam, GetMoviesScraperMetadataParam, GetMoviesSearchMetadataParam, GetMoviesSimilarsMetadataParam, GetMoviesUpcomingMetadataParam, GetNewsLastMetadataParam, GetPersonsArticlesMetadataParam, GetPersonsPersonMetadataParam, GetPicturesBadgesMetadataParam, GetPicturesCharactersMetadataParam, GetPicturesEpisodesMetadataParam, GetPicturesMembersMetadataParam, GetPicturesMoviesMetadataParam, GetPicturesPersonsMetadataParam, GetPicturesPlatformsMetadataParam, GetPicturesSeasonsMetadataParam, GetPicturesShowsMetadataParam, GetPlanningGeneralMetadataParam, GetPlanningIncomingMetadataParam, GetPlanningMemberMetadataParam, GetPlatformsListMetadataParam, GetPlatformsServicesMetadataParam, GetPollsLastMetadataParam, GetPollsListMetadataParam, GetPollsPollMetadataParam, GetPollsTargetMetadataParam, GetSearchAllMetadataParam, GetSearchMoviesMetadataParam, GetSearchShowsMetadataParam, GetShowsArticlesMetadataParam, GetShowsCharactersMetadataParam, GetShowsDiscoverMetadataParam, GetShowsDiscoverPlatformsMetadataParam, GetShowsDisplayMetadataParam, GetShowsEpisodesMetadataParam, GetShowsFavoritesMetadataParam, GetShowsGenresMetadataParam, GetShowsListMetadataParam, GetShowsMemberMetadataParam, GetShowsPicturesMetadataParam, GetShowsRandomMetadataParam, GetShowsRecommendationsMetadataParam, GetShowsSearchMetadataParam, GetShowsSeasonsMetadataParam, GetShowsSimilarsMetadataParam, GetShowsUnratedMetadataParam, GetShowsVideosMetadataParam, GetSubtitlesEpisodeMetadataParam, GetSubtitlesLastMetadataParam, GetSubtitlesSeasonMetadataParam, GetSubtitlesShowMetadataParam, GetTagsListMetadataParam, GetTimelineEventMetadataParam, GetTimelineFeedMetadataParam, GetTimelineFriendsMetadataParam, GetTimelineHomeMetadataParam, GetTimelineMemberMetadataParam, GetTimelineShowMetadataParam, PostCollectionsCollectionMetadataParam, PostCommentsCommentEventMetadataParam, PostCommentsCommentMetadataParam, PostCommentsSubscriptionMetadataParam, PostCommentsThumbMetadataParam, PostEpisodesDownloadedMetadataParam, PostEpisodesHiddenMetadataParam, PostEpisodesNoteMetadataParam, PostEpisodesWatchedMetadataParam, PostFriendsBlockMetadataParam, PostFriendsFriendMetadataParam, PostMembersAccessTokenMetadataParam, PostMembersAuthMetadataParam, PostMembersAvatarMetadataParam, PostMembersBannerMetadataParam, PostMembersDeleteMetadataParam, PostMembersDestroyMetadataParam, PostMembersEmailMetadataParam, PostMembersLocaleMetadataParam, PostMembersLostMetadataParam, PostMembersOauthMetadataParam, PostMembersOptionMetadataParam, PostMembersPasswordMetadataParam, PostMembersSignupMetadataParam, PostMembersSyncMetadataParam, PostMessagesMessageMetadataParam, PostMessagesReadMetadataParam, PostMoviesFavoriteMetadataParam, PostMoviesMovieMetadataParam, PostMoviesNoteMetadataParam, PostOauthAccessTokenMetadataParam, PostOauthDeviceMetadataParam, PostPlatformsServiceMetadataParam, PostPollsAnswerMetadataParam, PostReportsReportMetadataParam, PostReportsUpdateMetadataParam, PostSeasonsHideMetadataParam, PostSeasonsNoteMetadataParam, PostSeasonsWatchedMetadataParam, PostShowsArchiveMetadataParam, PostShowsFavoriteMetadataParam, PostShowsNoteMetadataParam, PostShowsRecommendationMetadataParam, PostShowsShowMetadataParam, PostShowsTagsMetadataParam, PostSubtitlesReportMetadataParam, PostTagsTagMetadataParam, PutShowsRecommendationMetadataParam } from './types';
