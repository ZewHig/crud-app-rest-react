package br.com.crud.crud_app.domain.execption;

public class EntidadeNaoEncontrada extends RuntimeException{

	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;

	public EntidadeNaoEncontrada (String msg) {
		super(msg);
	}
}