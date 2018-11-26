<div class="form-block">
    <div class="container">
    <div class="form-block__title text-center">
        <div class="text40">Свяжитесь с нами!</div>
    </div>
    <div class="form-block__slogan text-center">
        <div class="text24">Мы ответим в течении 10 минут</div>
    </div>
    <div class="form-block__body">
        <form id="contactForm" enctype="multipart/form-data", method="post", action="submit.php">
            <div class="form-box-list">
                <div class="form-box">
                    <fieldset>
                        <input name="email" type="email" placeholder="Email" required/></fieldset>
                    <fieldset>
                        <div class="file-input">
                            <div class="file-input__wrap">
                                <input id="uploadfile" name="file" type="file" data-max-size="2048" accept=".xls,.xlsx, .jpg, .png, .doc, .docx" />
                                <div class="file-input__label">Файл</div>
                                <div class="btn-input">Обзор</div>
                            </div>
                            <div class="clear"></div>
                        </div>
                    </fieldset>
                </div>
                <div class="form-box"><textarea name="message" placeholder="Сообщение"></textarea></div>
            </div>
            <div class="form-button">
                <button class="btn">ОТПРАВИТЬ</button>
            </div>
        </form>
    </div>
    </div>
</div>